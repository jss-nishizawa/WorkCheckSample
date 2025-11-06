import { openDB } from 'idb'

const DB_NAME = 'WorkCheckDB'
const DB_VERSION = 2

// IndexedDB初期化
export async function initDB() {
  try {
    console.log('IndexedDB初期化開始...')
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        console.log('IndexedDBスキーマアップグレード中...')
        // executions: チェック実行の履歴（メタデータ + チェック結果）
        if (!db.objectStoreNames.contains('executions')) {
          console.log('executionsストア作成中...')
          const executionStore = db.createObjectStore('executions', { keyPath: 'id' })
          executionStore.createIndex('timestamp', 'timestamp', { unique: false })
          executionStore.createIndex('date', 'date', { unique: false })
        }

        // blobs: 署名画像などのバイナリデータ
        if (!db.objectStoreNames.contains('blobs')) {
          console.log('blobsストア作成中...')
          db.createObjectStore('blobs', { keyPath: 'id' })
        }

        // meta: 実行ID採番用のメタデータ
        if (!db.objectStoreNames.contains('meta')) {
          console.log('metaストア作成中...')
          db.createObjectStore('meta', { keyPath: 'key' })
        }

        // templates: チェックリストテンプレート
        if (!db.objectStoreNames.contains('templates')) {
          console.log('templatesストア作成中...')
          const templateStore = db.createObjectStore('templates', { keyPath: 'id' })
          templateStore.createIndex('templateId', 'templateId', { unique: true })
          templateStore.createIndex('isDefault', 'isDefault', { unique: false })
        }
        console.log('IndexedDBスキーマアップグレード完了')
      }
    })
    console.log('IndexedDB初期化完了')
    return db
  } catch (error) {
    console.error('IndexedDB初期化エラー:', error)
    throw new Error(`データベースの初期化に失敗しました: ${error.message}`)
  }
}

// 実行履歴を保存
export async function saveExecution(data) {
  try {
    console.log('saveExecution呼び出し:', data)
    
    // データを安全にシリアライズ
    const safeData = JSON.parse(JSON.stringify(data))
    console.log('シリアライズ後のデータ:', safeData)
    
    const db = await initDB()
    const tx = db.transaction('executions', 'readwrite')
    await tx.store.put(safeData)
    await tx.done
    console.log('saveExecution完了')
  } catch (error) {
    console.error('saveExecutionエラー:', error)
    throw new Error(`実行データの保存に失敗しました: ${error.message}`)
  }
}

// 実行履歴を取得（最新N件）
export async function getExecutions(limit = 20) {
  const db = await initDB()
  const tx = db.transaction('executions', 'readonly')
  const index = tx.store.index('timestamp')
  let cursor = await index.openCursor(null, 'prev')
  const results = []
  
  while (cursor && results.length < limit) {
    results.push(cursor.value)
    cursor = await cursor.continue()
  }
  
  return results
}

// 実行履歴を1件取得
export async function getExecution(id) {
  const db = await initDB()
  return db.get('executions', id)
}

// 実行履歴を削除
export async function deleteExecution(id) {
  const db = await initDB()
  const tx = db.transaction(['executions', 'blobs'], 'readwrite')
  
  // 関連する署名画像も削除
  await tx.objectStore('blobs').delete(`${id}_operator_signature`)
  await tx.objectStore('blobs').delete(`${id}_checker_signature`)
  await tx.objectStore('executions').delete(id)
  
  await tx.done
}

// Blob（署名画像）を保存
export async function saveBlob(id, dataUrl) {
  try {
    console.log('saveBlob呼び出し:', id, `(${dataUrl ? dataUrl.substring(0, 50) : 'null'}...)`)
    
    if (!dataUrl) {
      throw new Error('署名データが空です')
    }
    
    // データを安全にシリアライズ
    const safeData = { id, dataUrl: String(dataUrl) }
    console.log('シリアライズ後の署名データ:', { id, dataUrlLength: safeData.dataUrl.length })
    
    const db = await initDB()
    await db.put('blobs', safeData)
    console.log('saveBlob完了:', id)
  } catch (error) {
    console.error('saveBlobエラー:', error)
    throw new Error(`署名画像の保存に失敗しました: ${error.message}`)
  }
}

// Blob（署名画像）を取得
export async function getBlob(id) {
  const db = await initDB()
  const result = await db.get('blobs', id)
  return result ? result.dataUrl : null
}

// メタデータを保存
export async function saveMeta(key, value) {
  try {
    console.log('saveMeta呼び出し:', key, value)
    const db = await initDB()
    await db.put('meta', { key, value })
    console.log('saveMeta完了:', key)
  } catch (error) {
    console.error('saveMetaエラー:', error)
    throw new Error(`メタデータの保存に失敗しました: ${error.message}`)
  }
}

// メタデータを取得
export async function getMeta(key) {
  try {
    console.log('getMeta呼び出し:', key)
    const db = await initDB()
    const result = await db.get('meta', key)
    const value = result ? result.value : null
    console.log('getMeta完了:', key, '→', value)
    return value
  } catch (error) {
    console.error('getMetaエラー:', error)
    throw new Error(`メタデータの取得に失敗しました: ${error.message}`)
  }
}

// 当日の実行ID採番カウンターを取得・更新（テンプレートIDごと、日付ごと）
export async function getNextRunNumber(templateId, date) {
  try {
    console.log('getNextRunNumber呼び出し:', templateId, date)
    const key = `runCounter_${templateId}_${date}`
    const current = await getMeta(key)
    const next = (current || 0) + 1
    console.log('次の連番:', next)
    await saveMeta(key, next)
    return next
  } catch (error) {
    console.error('getNextRunNumberエラー:', error)
    throw new Error(`連番の取得に失敗しました: ${error.message}`)
  }
}

// ===== テンプレート管理機能 =====

// テンプレートを保存
export async function saveTemplate(template) {
  try {
    console.log('saveTemplate呼び出し:', template)
    
    // Vueのリアクティブオブジェクトをプレーンオブジェクトに変換
    const safeTemplate = JSON.parse(JSON.stringify(template))
    
    if (!safeTemplate.id) {
      safeTemplate.id = crypto.randomUUID()
    }
    if (!safeTemplate.createdAt) {
      safeTemplate.createdAt = new Date().toISOString()
    }
    safeTemplate.updatedAt = new Date().toISOString()
    
    console.log('シリアライズ後のテンプレート:', safeTemplate)
    
    const db = await initDB()
    const tx = db.transaction('templates', 'readwrite')
    await tx.store.put(safeTemplate)
    await tx.done
    console.log('saveTemplate完了:', safeTemplate.id)
    return safeTemplate.id
  } catch (error) {
    console.error('saveTemplateエラー:', error)
    throw new Error(`テンプレートの保存に失敗しました: ${error.message}`)
  }
}

// 全テンプレートを取得
export async function getTemplates() {
  try {
    const db = await initDB()
    const tx = db.transaction('templates', 'readonly')
    const templates = await tx.store.getAll()
    return templates || []
  } catch (error) {
    console.error('getTemplatesエラー:', error)
    throw new Error(`テンプレートの取得に失敗しました: ${error.message}`)
  }
}

// 特定のテンプレートを取得
export async function getTemplate(id) {
  try {
    const db = await initDB()
    return await db.get('templates', id)
  } catch (error) {
    console.error('getTemplateエラー:', error)
    throw new Error(`テンプレートの取得に失敗しました: ${error.message}`)
  }
}

// テンプレートIDで取得
export async function getTemplateByTemplateId(templateId) {
  try {
    const db = await initDB()
    const tx = db.transaction('templates', 'readonly')
    const index = tx.store.index('templateId')
    return await index.get(templateId)
  } catch (error) {
    console.error('getTemplateByTemplateIdエラー:', error)
    throw new Error(`テンプレートの取得に失敗しました: ${error.message}`)
  }
}

// テンプレートを削除
export async function deleteTemplate(id) {
  try {
    const db = await initDB()
    const tx = db.transaction('templates', 'readwrite')
    await tx.store.delete(id)
    await tx.done
    console.log('deleteTemplate完了:', id)
  } catch (error) {
    console.error('deleteTemplateエラー:', error)
    throw new Error(`テンプレートの削除に失敗しました: ${error.message}`)
  }
}

// アクティブなテンプレートIDを取得
export async function getActiveTemplateId() {
  try {
    const templateId = await getMeta('activeTemplateId')
    return templateId
  } catch (error) {
    console.error('getActiveTemplateIdエラー:', error)
    return null
  }
}

// アクティブなテンプレートIDを設定
export async function setActiveTemplateId(id) {
  try {
    await saveMeta('activeTemplateId', id)
    console.log('setActiveTemplateId完了:', id)
  } catch (error) {
    console.error('setActiveTemplateIdエラー:', error)
    throw new Error(`アクティブテンプレートの設定に失敗しました: ${error.message}`)
  }
}

// ===== 会社設定管理機能 =====

// 会社設定を保存
export async function saveCompanyConfig(config) {
  try {
    console.log('saveCompanyConfig呼び出し:', config)
    await saveMeta('companyConfig', config)
    console.log('saveCompanyConfig完了')
  } catch (error) {
    console.error('saveCompanyConfigエラー:', error)
    throw new Error(`会社設定の保存に失敗しました: ${error.message}`)
  }
}

// 会社設定を取得
export async function getCompanyConfig() {
  try {
    const config = await getMeta('companyConfig')
    return config
  } catch (error) {
    console.error('getCompanyConfigエラー:', error)
    return null
  }
}

// 会社ロゴを保存
export async function saveCompanyLogo(dataUrl) {
  try {
    console.log('saveCompanyLogo呼び出し')
    if (!dataUrl) {
      throw new Error('ロゴデータが空です')
    }
    await saveBlob('company_logo', dataUrl)
    console.log('saveCompanyLogo完了')
  } catch (error) {
    console.error('saveCompanyLogoエラー:', error)
    throw new Error(`会社ロゴの保存に失敗しました: ${error.message}`)
  }
}

// 会社ロゴを取得
export async function getCompanyLogo() {
  try {
    return await getBlob('company_logo')
  } catch (error) {
    console.error('getCompanyLogoエラー:', error)
    return null
  }
}

