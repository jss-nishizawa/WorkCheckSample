<template>
  <div class="template-manager-view">
    <h2 class="page-title">テンプレート管理</h2>
    
    <!-- アクションバー -->
    <div class="action-bar">
      <button class="btn btn-primary" @click="openEditor(null)">
        + 新規作成
      </button>
      
      <div class="dropdown">
        <button class="btn btn-secondary" @click="showImportMenu = !showImportMenu">
          📥 インポート ▼
        </button>
        <div v-if="showImportMenu" class="dropdown-menu">
          <button class="dropdown-item" @click="handleImportFromFile">
            ファイルから
          </button>
          <button class="dropdown-item" @click="handleImportFromUrl">
            URLから（Googleドライブ）
          </button>
          <button class="dropdown-item" @click="handleImportFromClipboard">
            クリップボードから
          </button>
        </div>
      </div>
    </div>
    
    <!-- テンプレート一覧 -->
    <div v-if="templates.length === 0" class="empty-state">
      <p>テンプレートがありません</p>
      <button class="btn btn-primary" @click="openEditor(null)">
        最初のテンプレートを作成
      </button>
    </div>
    
    <div v-else class="templates-list">
      <div
        v-for="template in templates"
        :key="template.id"
        class="template-card"
        :class="{ active: isActiveTemplate(template.id) }"
      >
        <div class="template-header">
          <div class="template-info">
            <h3 class="template-name">{{ template.name }}</h3>
            <p v-if="template.description" class="template-description">
              {{ template.description }}
            </p>
            <div class="template-meta">
              <span class="meta-item">{{ template.items.length }}項目</span>
              <span class="meta-item">ID: {{ template.templateId }}</span>
              <span v-if="isActiveTemplate(template.id)" class="badge active-badge">
                使用中
              </span>
            </div>
          </div>
          
          <div class="template-actions">
            <button
              v-if="!isActiveTemplate(template.id)"
              class="btn btn-primary btn-sm"
              @click="setActiveTemplate(template.id)"
            >
              使用する
            </button>
            <button
              class="btn btn-secondary btn-sm"
              @click="openEditor(template)"
            >
              編集
            </button>
            <div class="dropdown">
              <button class="btn btn-secondary btn-sm" @click="showActionMenu(template.id)">
                ⋯
              </button>
              <div v-if="activeMenuId === template.id" class="dropdown-menu dropdown-menu-right">
                <button class="dropdown-item" @click="handleExport(template)">
                  📤 エクスポート
                </button>
                <button class="dropdown-item" @click="handleCopy(template)">
                  📋 コピー
                </button>
                <button class="dropdown-item" @click="handleUploadGuide(template)">
                  ☁️ アップロード案内
                </button>
                <hr class="dropdown-divider" />
                <button class="dropdown-item dropdown-item-danger" @click="handleDelete(template.id)">
                  🗑️ 削除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- テンプレート編集モーダル -->
    <TemplateEditor
      :is-open="editorModal.isOpen"
      :title="editorModal.title"
      :template="editorModal.template"
      @close="closeEditor"
      @save="handleSaveTemplate"
    />
    
    <!-- URL入力モーダル -->
    <div v-if="urlInputModal.isOpen" class="modal-overlay" @click.self="closeUrlInput">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">URLからインポート</h2>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="importUrl" class="form-label">JSONファイルのURL</label>
            <input
              id="importUrl"
              type="text"
              class="form-input"
              v-model="urlInputModal.url"
              placeholder="https://drive.google.com/file/d/... または https://raw.githubusercontent.com/..."
            />
            <p class="form-hint">
              Googleドライブの共有リンクまたは、その他のJSONファイルのURLを入力してください。
            </p>
          </div>
          
          <!-- Googleドライブの場合のダウンロードボタン -->
          <div v-if="urlInputModal.url.includes('drive.google.com')" class="form-group">
            <button class="btn btn-secondary" @click="downloadFromGoogleDrive">
              📥 Googleドライブからダウンロード
            </button>
            <p class="form-hint">
              ダウンロードが完了したら、「ファイルから」インポートでダウンロードしたファイルを選択してください。
            </p>
          </div>
          
          <p v-if="urlInputModal.error" class="form-error">{{ urlInputModal.error }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="handleImportUrl">インポート</button>
          <button class="btn btn-secondary" @click="closeUrlInput">キャンセル</button>
        </div>
      </div>
    </div>
    
    <!-- クリップボード入力モーダル -->
    <div v-if="clipboardModal.isOpen" class="modal-overlay" @click.self="closeClipboard">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">クリップボードからインポート</h2>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="clipboardText" class="form-label">JSONテキスト</label>
            <textarea
              id="clipboardText"
              class="form-textarea"
              v-model="clipboardModal.text"
              placeholder="テンプレートのJSONを貼り付けてください..."
              rows="10"
            ></textarea>
          </div>
          <p v-if="clipboardModal.error" class="form-error">{{ clipboardModal.error }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="handleImportClipboard">インポート</button>
          <button class="btn btn-secondary" @click="closeClipboard">キャンセル</button>
        </div>
      </div>
    </div>
    
    <!-- Googleドライブアップロード案内モーダル -->
    <div v-if="uploadGuideModal.isOpen" class="modal-overlay" @click.self="closeUploadGuide">
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h2 class="modal-title">Googleドライブへのアップロード案内</h2>
        </div>
        <div class="modal-body">
          <div class="guide-section">
            <h3 class="guide-section-title">📤 手順1: テンプレートをエクスポート</h3>
            <p class="guide-text">
              まず、このテンプレートをエクスポートしてJSONファイルをダウンロードしてください。
            </p>
            <button class="btn btn-primary" @click="exportAndShowGuide">
              📥 エクスポートしてダウンロード
            </button>
          </div>
          
          <div class="guide-section">
            <h3 class="guide-section-title">📁 手順2: Googleドライブにアップロード</h3>
            <ol class="guide-steps">
              <li>
                <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" class="guide-link">
                  Googleドライブを開く
                </a>
              </li>
              <li>「新規」→「ファイルをアップロード」をクリック</li>
              <li>ダウンロードしたJSONファイルを選択してアップロード</li>
            </ol>
          </div>
          
          <div class="guide-section">
            <h3 class="guide-section-title">🔗 手順3: 共有リンクを取得</h3>
            <ol class="guide-steps">
              <li>アップロードしたファイルを右クリック</li>
              <li>「共有」→「リンクを取得」をクリック</li>
              <li>「リンクを知っている全員」に変更（必要に応じて）</li>
              <li>共有リンクをコピー</li>
            </ol>
            <div class="guide-note">
              <strong>⚠️ 注意:</strong> 共有リンクは「リンクを知っている全員」に設定する必要があります。
            </div>
          </div>
          
          <div class="guide-section">
            <h3 class="guide-section-title">📋 手順4: 共有リンクを配布</h3>
            <p class="guide-text">
              コピーした共有リンクを、このテンプレートを使用する必要があるユーザーに配布してください。
            </p>
            <div class="guide-note">
              <strong>ユーザーへの案内:</strong><br>
              1. 「インポート」→「URLから（Googleドライブ）」を選択<br>
              2. 共有リンクを貼り付けると「📥 Googleドライブからダウンロード」ボタンが表示されます<br>
              3. ボタンをクリックしてファイルをダウンロード<br>
              4. ダウンロード完了後、自動的にファイル選択ダイアログが開きます<br>
              5. ダウンロードしたJSONファイルを選択してインポート
            </div>
            <p class="guide-text">
              <strong>代替方法:</strong><br>
              - 「クリップボードから」でJSONテキストを直接貼り付け<br>
              - GitHubのrawファイルや、CORS対応のサーバーにアップロードすれば、「URLから」で直接インポート可能
            </p>
          </div>
          
          <div class="guide-section">
            <h3 class="guide-section-title">💡 ヒント</h3>
            <ul class="guide-tips">
              <li>複数のテンプレートを管理する場合は、Googleドライブにフォルダを作成して整理できます</li>
              <li>テンプレートを更新した場合は、同じファイルを上書きするか、新しいファイル名でアップロードしてください</li>
              <li>共有リンクは定期的に見直して、不要になった場合は削除または無効化してください</li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeUploadGuide">閉じる</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import TemplateEditor from '@/components/TemplateEditor.vue'
import {
  getTemplates,
  saveTemplate,
  deleteTemplate,
  getActiveTemplateId,
  setActiveTemplateId
} from '@/stores/db'

const templates = ref([])
const activeTemplateId = ref(null)
const showImportMenu = ref(false)
const activeMenuId = ref(null)

const editorModal = ref({
  isOpen: false,
  title: 'テンプレート編集',
  template: null
})

const urlInputModal = ref({
  isOpen: false,
  url: '',
  error: ''
})

const clipboardModal = ref({
  isOpen: false,
  text: '',
  error: ''
})

const uploadGuideModal = ref({
  isOpen: false,
  template: null
})

// アクティブなテンプレートかどうか
const isActiveTemplate = (id) => {
  return activeTemplateId.value === id
}

// テンプレート一覧を読み込む
const loadTemplates = async () => {
  try {
    templates.value = await getTemplates()
    activeTemplateId.value = await getActiveTemplateId()
  } catch (error) {
    console.error('テンプレート読み込みエラー:', error)
    alert('テンプレートの読み込みに失敗しました')
  }
}

// エディタを開く
const openEditor = (template) => {
  editorModal.value = {
    isOpen: true,
    title: template ? 'テンプレート編集' : 'テンプレート新規作成',
    template: template
  }
  showImportMenu.value = false
  activeMenuId.value = null
}

// エディタを閉じる
const closeEditor = () => {
  editorModal.value.isOpen = false
}

// テンプレートを保存
const handleSaveTemplate = async (template) => {
  try {
    await saveTemplate(template)
    await loadTemplates()
    
    // 新規作成の場合、自動的にアクティブにする
    if (!template.id) {
      const savedTemplates = await getTemplates()
      const saved = savedTemplates.find(t => t.templateId === template.templateId)
      if (saved) {
        await setActiveTemplate(saved.id)
      }
    }
    
    alert('テンプレートを保存しました')
  } catch (error) {
    console.error('テンプレート保存エラー:', error)
    alert('テンプレートの保存に失敗しました: ' + error.message)
  }
}

// アクティブテンプレートを設定
const setActiveTemplate = async (id) => {
  try {
    await setActiveTemplateId(id)
    activeTemplateId.value = id
    alert('テンプレートをアクティブに設定しました')
    // ページをリロードして反映
    window.location.reload()
  } catch (error) {
    console.error('アクティブテンプレート設定エラー:', error)
    alert('アクティブテンプレートの設定に失敗しました')
  }
}

// テンプレートを削除
const handleDelete = async (id) => {
  const template = templates.value.find(t => t.id === id)
  if (!template) return
  
  if (!confirm(`「${template.name}」を削除しますか？\nこの操作は取り消せません。`)) {
    return
  }
  
  try {
    await deleteTemplate(id)
    await loadTemplates()
    alert('テンプレートを削除しました')
  } catch (error) {
    console.error('テンプレート削除エラー:', error)
    alert('テンプレートの削除に失敗しました')
  }
}

// アクションメニューを表示
const showActionMenu = (id) => {
  activeMenuId.value = activeMenuId.value === id ? null : id
  showImportMenu.value = false
}

// エクスポート
const handleExport = (template) => {
  try {
    const exportData = {
      name: template.name,
      templateId: template.templateId,
      description: template.description,
      version: '1.0',
      items: template.items,
      exportedAt: new Date().toISOString()
    }
    
    const json = JSON.stringify(exportData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '')
    a.href = url
    a.download = `template-${template.templateId}-${date}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    activeMenuId.value = null
    alert('テンプレートをエクスポートしました')
  } catch (error) {
    console.error('エクスポートエラー:', error)
    alert('エクスポートに失敗しました')
  }
}

// コピー
const handleCopy = async (template) => {
  try {
    const exportData = {
      name: template.name,
      templateId: template.templateId,
      description: template.description,
      version: '1.0',
      items: template.items,
      exportedAt: new Date().toISOString()
    }
    
    const json = JSON.stringify(exportData, null, 2)
    await navigator.clipboard.writeText(json)
    
    activeMenuId.value = null
    alert('クリップボードにコピーしました')
  } catch (error) {
    console.error('コピーエラー:', error)
    alert('コピーに失敗しました')
  }
}

// アップロード案内
const handleUploadGuide = async (template) => {
  uploadGuideModal.value = {
    isOpen: true,
    template: template
  }
  activeMenuId.value = null
}

// エクスポートして案内を表示
const exportAndShowGuide = () => {
  if (uploadGuideModal.value.template) {
    handleExport(uploadGuideModal.value.template)
  }
}

// アップロード案内モーダルを閉じる
const closeUploadGuide = () => {
  uploadGuideModal.value = {
    isOpen: false,
    template: null
  }
}

// ファイルからインポート
const handleImportFromFile = () => {
  try {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return
      
      try {
        const text = await file.text()
        const template = JSON.parse(text)
        await importTemplate(template)
        showImportMenu.value = false
        alert('テンプレートをインポートしました')
      } catch (error) {
        console.error('インポートエラー:', error)
        alert('ファイルのインポートに失敗しました: ' + error.message)
      }
    }
    
    // ファイル選択ダイアログを開く
    input.click()
    showImportMenu.value = false
  } catch (error) {
    console.error('ファイル選択エラー:', error)
    alert('ファイル選択ダイアログの表示に失敗しました: ' + error.message)
  }
}

// URLからインポート
const handleImportFromUrl = () => {
  urlInputModal.value = {
    isOpen: true,
    url: '',
    error: ''
  }
  showImportMenu.value = false
}

// クリップボードからインポート
const handleImportFromClipboard = () => {
  clipboardModal.value = {
    isOpen: true,
    text: '',
    error: ''
  }
  showImportMenu.value = false
}

// Googleドライブからダウンロードを開始
const downloadFromGoogleDrive = () => {
  const url = urlInputModal.value.url.trim()
  const match = url.match(/\/file\/d\/([^\/\?]+)/)
  
  if (!match) {
    urlInputModal.value.error = 'GoogleドライブのファイルIDが取得できませんでした。共有リンクの形式を確認してください。'
    return
  }
  
  const fileId = match[1]
  // Googleドライブの直接ダウンロードURLを生成
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`
  
  // 新しいタブでダウンロードを開始
  window.open(downloadUrl, '_blank')
  
  // ダウンロード後、ファイル選択を促す
  setTimeout(() => {
    if (confirm('ダウンロードが完了したら、「OK」をクリックしてファイル選択ダイアログを開いてください。\n\n（ダウンロードがまだ完了していない場合は「キャンセル」をクリックしてください）')) {
      // モーダルを閉じる
      closeUrlInput()
      
      // モーダルが完全に閉じるのを待ってからファイル選択ダイアログを開く
      // ユーザーインタラクションのコンテキストを保持するため、少し待つ
      setTimeout(() => {
        try {
          handleImportFromFile()
        } catch (error) {
          console.error('ファイル選択ダイアログの表示エラー:', error)
          alert('ファイル選択ダイアログの表示に失敗しました。\n\n手動で「インポート」→「ファイルから」を選択して、ダウンロードしたファイルを選択してください。')
        }
      }, 200)
    }
  }, 1000)
}

// URLインポート実行
const handleImportUrl = async () => {
  urlInputModal.value.error = ''
  
  if (!urlInputModal.value.url.trim()) {
    urlInputModal.value.error = 'URLを入力してください'
    return
  }
  
  // Googleドライブの場合は、ダウンロード方法を案内
  if (urlInputModal.value.url.includes('drive.google.com')) {
    urlInputModal.value.error = 'Googleドライブから直接インポートはできません（CORS制限のため）。\n\n「📥 Googleドライブからダウンロード」ボタンを使用してダウンロードしてから、「ファイルから」インポートしてください。'
    return
  }
  
  try {
    // Googleドライブ以外のURLの場合
    const url = urlInputModal.value.url.trim()
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`ファイルの取得に失敗しました（ステータス: ${response.status}）`)
    }
    
    const text = await response.text()
    
    // HTMLが返される場合（エラーページなど）
    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      throw new Error('JSONファイルが取得できませんでした。URLが正しいか確認してください。')
    }
    
    const template = JSON.parse(text)
    await importTemplate(template)
    
    closeUrlInput()
    alert('テンプレートをインポートしました')
  } catch (error) {
    console.error('URLインポートエラー:', error)
    urlInputModal.value.error = 'インポートに失敗しました: ' + error.message
  }
}

// クリップボードインポート実行
const handleImportClipboard = async () => {
  clipboardModal.value.error = ''
  
  if (!clipboardModal.value.text.trim()) {
    clipboardModal.value.error = 'JSONテキストを入力してください'
    return
  }
  
  try {
    const template = JSON.parse(clipboardModal.value.text)
    await importTemplate(template)
    
    closeClipboard()
    alert('テンプレートをインポートしました')
  } catch (error) {
    console.error('クリップボードインポートエラー:', error)
    clipboardModal.value.error = 'インポートに失敗しました: ' + error.message
  }
}

// テンプレートをインポート
const importTemplate = async (template) => {
  // バリデーション
  if (!template.name || !template.templateId || !Array.isArray(template.items)) {
    throw new Error('テンプレート形式が不正です')
  }
  
  // テンプレートIDの重複チェック
  const existing = templates.value.find(t => t.templateId === template.templateId)
  if (existing) {
    if (!confirm(`「${existing.name}」という名前のテンプレートが既に存在します。\n上書きしますか？`)) {
      return
    }
    template.id = existing.id
  }
  
  // テンプレートを保存
  await saveTemplate(template)
  await loadTemplates()
}

// URL入力モーダルを閉じる
const closeUrlInput = () => {
  urlInputModal.value = {
    isOpen: false,
    url: '',
    error: ''
  }
}

// クリップボードモーダルを閉じる
const closeClipboard = () => {
  clipboardModal.value = {
    isOpen: false,
    text: '',
    error: ''
  }
}

// クリック外側でメニューを閉じる
const handleClickOutside = (e) => {
  if (!e.target.closest('.dropdown')) {
    showImportMenu.value = false
    activeMenuId.value = null
  }
  if (!e.target.closest('.modal-content') && !e.target.closest('.btn')) {
    // モーダル外側のクリックは modal-overlay の @click.self で処理される
  }
}

onMounted(() => {
  loadTemplates()
  document.addEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.template-manager-view {
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.action-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
}

.dropdown-menu-right {
  left: auto;
  right: 0;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  color: #374151;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f9fafb;
}

.dropdown-item-danger {
  color: #ef4444;
}

.dropdown-item-danger:hover {
  background: #fee2e2;
}

.dropdown-divider {
  margin: 0.5rem 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  color: #6b7280;
}

.templates-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.template-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s;
}

.template-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.template-card.active {
  border-color: #2563eb;
  background: #eff6ff;
}

.template-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.template-info {
  flex: 1;
}

.template-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.template-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.75rem 0;
}

.template-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 0.875rem;
  color: #6b7280;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.active-badge {
  background: #2563eb;
  color: white;
}

.template-actions {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.form-hint {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.guide-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.guide-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.guide-section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.guide-text {
  font-size: 0.9375rem;
  color: #374151;
  line-height: 1.6;
  margin: 0.5rem 0;
}

.guide-steps {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  color: #374151;
  line-height: 1.8;
}

.guide-steps li {
  margin-bottom: 0.5rem;
}

.guide-link {
  color: #2563eb;
  text-decoration: underline;
  font-weight: 500;
}

.guide-link:hover {
  color: #1e40af;
}

.guide-note {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  border-radius: 0.25rem;
  color: #92400e;
  font-size: 0.875rem;
}

.guide-tips {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  color: #374151;
  line-height: 1.8;
}

.guide-tips li {
  margin-bottom: 0.5rem;
}

@media (max-width: 640px) {
  .template-header {
    flex-direction: column;
  }
  
  .template-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .action-bar {
    flex-direction: column;
  }
  
  .action-bar .btn {
    width: 100%;
  }
}
</style>


