import { openDB } from 'idb'

const DB_NAME = 'WorkCheckDB'
const DB_VERSION = 1

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

// 当日の実行ID採番カウンターを取得・更新
export async function getNextRunNumber(date) {
  try {
    console.log('getNextRunNumber呼び出し:', date)
    const key = `runCounter_${date}`
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

