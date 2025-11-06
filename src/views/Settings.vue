<template>
  <div class="settings-view">
    <h2 class="page-title">設定</h2>
    
    <div class="card">
      <h3 class="card-title">アプリ情報</h3>
      
      <div class="info-section">
        <div class="info-row">
          <span class="info-label">バージョン:</span>
          <span class="info-value">v0.3.0</span>
        </div>
        <div class="info-row">
          <span class="info-label">会社名:</span>
          <span class="info-value">{{ companyShortName }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">テンプレート:</span>
          <span class="info-value">{{ templateName }}</span>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h3 class="card-title">会社情報・ロゴ管理</h3>
      
      <p class="setting-description">
        メールの添付ファイルから会社情報やロゴを読み込むことができます。
      </p>
      
      <div class="setting-actions">
        <div class="action-group">
          <h4 class="action-title">会社情報</h4>
          <div class="action-buttons">
            <button class="btn btn-primary" @click="handleImportCompanyConfig">
              📥 会社情報をインポート
            </button>
            <button class="btn btn-secondary" @click="handleExportCompanyConfig">
              📤 会社情報をエクスポート
            </button>
          </div>
          <p class="action-hint">
            JSONファイル（例: company-config.json）を選択してインポート
          </p>
          <details class="config-format">
            <summary>ファイル形式の例</summary>
            <pre class="config-example">{
  "companyName": "株式会社 サンプル",
  "companyShortName": "SAMPLE",
  "runIdPrefix": "SMP"
}</pre>
            <p class="config-note">
              <strong>companyName</strong>: 会社名（フッターや印刷時に表示）<br>
              <strong>companyShortName</strong>: 会社名（短縮名、設定画面のアプリ情報に表示）<br>
              <strong>runIdPrefix</strong>: 実行IDのプレフィックス（例: SMP → SMP-STANDARD-20251029-001）
            </p>
          </details>
        </div>
        
        <div class="action-group">
          <h4 class="action-title">会社ロゴ</h4>
          <div class="action-buttons">
            <button class="btn btn-primary" @click="handleImportLogo">
              📥 ロゴをインポート
            </button>
            <button v-if="hasLogo" class="btn btn-secondary" @click="handlePreviewLogo">
              👁️ ロゴをプレビュー
            </button>
            <button v-if="hasLogo" class="btn btn-danger" @click="handleDeleteLogo">
              🗑️ ロゴを削除
            </button>
          </div>
          <p class="action-hint">
            画像ファイル（PNG、JPG、SVG）を選択してインポート
          </p>
          <div v-if="hasLogo" class="logo-preview">
            <img :src="logoPreview" alt="会社ロゴ" class="logo-preview-image" />
          </div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h3 class="card-title">データ管理</h3>
      
      <p class="setting-description">
        履歴データは端末のIndexedDBに保存されます。<br>
        iOS環境では、一定期間後にOSによって削除される可能性があります。<br>
        重要な記録は必ずPDFで保存してください。
      </p>
      
      <div class="setting-actions">
        <button class="btn btn-danger" @click="handleClearData">
          すべてのデータを削除
        </button>
      </div>
    </div>
    
    <div class="card">
      <h3 class="card-title">PWA（Progressive Web App）</h3>
      
      <p class="setting-description">
        このアプリはホーム画面に追加してアプリのように使用できます。
      </p>
      
      <div class="pwa-instructions">
        <h4>iOS Safari の場合:</h4>
        <ol>
          <li>画面下部の「共有」ボタンをタップ</li>
          <li>「ホーム画面に追加」を選択</li>
          <li>「追加」をタップ</li>
        </ol>
        
        <h4>Android Chrome の場合:</h4>
        <ol>
          <li>画面右上のメニューをタップ</li>
          <li>「ホーム画面に追加」を選択</li>
          <li>「追加」をタップ</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import checklistTemplate from '@/assets/checklist.template.json'
import { initDB, saveCompanyConfig, getCompanyConfig, saveCompanyLogo, getCompanyLogo, getActiveTemplateId, getTemplate } from '@/stores/db'
import { COMPANY_SHORT_NAME } from '@/config/constants'

const templateName = ref(checklistTemplate.templateName)
const companyShortName = ref(COMPANY_SHORT_NAME)

// ロゴ管理
const hasLogo = ref(false)
const logoPreview = ref(null)

// 会社情報の読み込み
const loadCompanyInfo = async () => {
  try {
    const config = await getCompanyConfig()
    if (config && config.companyShortName) {
      companyShortName.value = config.companyShortName
    } else {
      // 会社情報がない場合はデフォルト値を使用
      companyShortName.value = COMPANY_SHORT_NAME
    }
  } catch (error) {
    console.error('会社情報読み込みエラー:', error)
    // エラー時はデフォルト値を使用
    companyShortName.value = COMPANY_SHORT_NAME
  }
}

// アクティブなテンプレート名の読み込み
const loadTemplateName = async () => {
  try {
    const activeTemplateId = await getActiveTemplateId()
    if (activeTemplateId) {
      const template = await getTemplate(activeTemplateId)
      if (template && template.name) {
        templateName.value = template.name
        return
      }
    }
    // アクティブテンプレートがない場合はデフォルトテンプレート名を使用
    templateName.value = checklistTemplate.templateName
  } catch (error) {
    console.error('テンプレート名読み込みエラー:', error)
    // エラー時はデフォルトテンプレート名を使用
    templateName.value = checklistTemplate.templateName
  }
}

// ロゴの読み込み
const loadLogo = async () => {
  try {
    const logo = await getCompanyLogo()
    if (logo) {
      hasLogo.value = true
      logoPreview.value = logo
    } else {
      hasLogo.value = false
      logoPreview.value = null
    }
  } catch (error) {
    console.error('ロゴ読み込みエラー:', error)
    hasLogo.value = false
    logoPreview.value = null
  }
}

// 会社情報をインポート
const handleImportCompanyConfig = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      const text = await file.text()
      const config = JSON.parse(text)
      
      // バリデーション
      if (!config.companyName && !config.runIdPrefix) {
        throw new Error('会社情報の形式が不正です。companyNameまたはrunIdPrefixが必要です。')
      }
      
      await saveCompanyConfig(config)
      // 会社情報を再読み込み
      await loadCompanyInfo()
      alert('会社情報をインポートしました。')
      
      // ページをリロード（設定を反映するため）
      if (confirm('設定を反映するためにページをリロードしますか？')) {
        window.location.reload()
      }
    } catch (error) {
      console.error('会社情報インポートエラー:', error)
      alert('会社情報のインポートに失敗しました: ' + error.message)
    }
  }
  input.click()
}

// 会社情報をエクスポート
const handleExportCompanyConfig = async () => {
  try {
    const config = await getCompanyConfig()
    
    if (!config) {
      alert('会社情報が設定されていません。')
      return
    }
    
    const json = JSON.stringify(config, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '')
    a.href = url
    a.download = `company-config-${date}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    alert('会社情報をエクスポートしました')
  } catch (error) {
    console.error('会社情報エクスポートエラー:', error)
    alert('会社情報のエクスポートに失敗しました: ' + error.message)
  }
}

// ロゴをインポート
const handleImportLogo = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      // ファイルをBase64に変換
      const reader = new FileReader()
      reader.onload = async (event) => {
        try {
          const dataUrl = event.target.result
          await saveCompanyLogo(dataUrl)
          await loadLogo()
          alert('ロゴをインポートしました。\nページをリロードして反映されます。')
          
          // ページをリロード（ロゴを反映するため）
          if (confirm('ロゴを反映するためにページをリロードしますか？')) {
            window.location.reload()
          }
        } catch (error) {
          console.error('ロゴ保存エラー:', error)
          alert('ロゴの保存に失敗しました: ' + error.message)
        }
      }
      reader.onerror = () => {
        alert('ファイルの読み込みに失敗しました')
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('ロゴインポートエラー:', error)
      alert('ロゴのインポートに失敗しました: ' + error.message)
    }
  }
  input.click()
}

// ロゴをプレビュー
const handlePreviewLogo = () => {
  if (logoPreview.value) {
    const newWindow = window.open()
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head><title>ロゴプレビュー</title></head>
          <body style="margin:0; padding:20px; text-align:center; background:#f5f5f5;">
            <h2>会社ロゴ</h2>
            <img src="${logoPreview.value}" alt="会社ロゴ" style="max-width:100%; height:auto; border:1px solid #ddd; padding:10px; background:white;" />
          </body>
        </html>
      `)
    }
  }
}

// ロゴを削除
const handleDeleteLogo = async () => {
  if (!confirm('ロゴを削除しますか？')) {
    return
  }
  
  try {
    // ロゴを削除（空の文字列を保存して削除）
    await saveCompanyLogo('')
    await loadLogo()
    alert('ロゴを削除しました。\nページをリロードして反映されます。')
    
    if (confirm('ページをリロードしますか？')) {
      window.location.reload()
    }
  } catch (error) {
    console.error('ロゴ削除エラー:', error)
    alert('ロゴの削除に失敗しました: ' + error.message)
  }
}

onMounted(async () => {
  // 会社情報を読み込む
  await loadCompanyInfo()
  
  // アクティブなテンプレート名を読み込む
  await loadTemplateName()
  
  // ロゴを読み込む
  await loadLogo()
})

// すべてのデータを削除
const handleClearData = async () => {
  const confirmed = confirm(
    'すべての履歴データを削除しますか？\n' +
    'この操作は取り消せません。\n' +
    '保存が必要な記録はPDFで保存済みか確認してください。'
  )
  
  if (!confirmed) return
  
  const doubleConfirm = confirm('本当に削除しますか？')
  if (!doubleConfirm) return
  
  try {
    // IndexedDBを削除
    const dbName = 'WorkCheckDB'
    const deleteRequest = indexedDB.deleteDatabase(dbName)
    
    deleteRequest.onsuccess = () => {
      // 再初期化
      initDB()
      alert('すべてのデータを削除しました。')
      window.location.reload()
    }
    
    deleteRequest.onerror = () => {
      throw new Error('削除に失敗しました')
    }
  } catch (error) {
    console.error('データ削除エラー:', error)
    alert('データの削除に失敗しました。')
  }
}
</script>

<style scoped>
.settings-view {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

/* 既存のスタイル */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  gap: 1rem;
}

.info-label {
  font-weight: 500;
  color: #6b7280;
  min-width: 120px;
}

.info-value {
  color: #1f2937;
}

.setting-description {
  color: #6b7280;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.setting-actions {
  margin-top: 1rem;
}

.pwa-instructions h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
  color: #1f2937;
}

.pwa-instructions ol {
  margin: 0 0 1rem 1.5rem;
  padding: 0;
  color: #4b5563;
}

.pwa-instructions li {
  margin-bottom: 0.25rem;
}

/* 会社情報・ロゴ管理 */
.action-group {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.action-group:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.action-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.action-hint {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.5rem 0 0 0;
}

.logo-preview {
  margin-top: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  text-align: center;
}

.logo-preview-image {
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
  display: block;
  margin: 0 auto;
}

.config-format {
  margin-top: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.config-format summary {
  cursor: pointer;
  font-weight: 500;
  color: #2563eb;
  user-select: none;
}

.config-format summary:hover {
  color: #1e40af;
}

.config-example {
  margin: 1rem 0;
  padding: 1rem;
  background: #1f2937;
  color: #f9fafb;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  overflow-x: auto;
}

.config-note {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0.5rem 0 0 0;
}

@media (max-width: 640px) {
  .status-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .check-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .check-info .btn {
    width: 100%;
  }
}
</style>

