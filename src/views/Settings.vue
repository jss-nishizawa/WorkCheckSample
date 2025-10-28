<template>
  <div class="settings-view">
    <h2 class="page-title">設定</h2>
    
    <div class="card">
      <h3 class="card-title">ネットワーク状態</h3>
      
      <div class="network-status-container">
        <div v-if="isServerOnline" class="status-card online">
          <div class="status-icon-large">🟢</div>
          <div class="status-info">
            <div class="status-title">オンライン</div>
            <div class="status-description">サーバーに接続されています</div>
            <div class="status-detail">{{ serverUrl }}</div>
          </div>
        </div>
        
        <div v-else class="status-card offline">
          <div class="status-icon-large">🔴</div>
          <div class="status-info">
            <div class="status-title">オフライン</div>
            <div class="status-description">
              <span v-if="!networkOnline">ネットワーク接続がありません</span>
              <span v-else>サーバーに接続できません</span>
            </div>
            <div class="status-detail">{{ serverUrl }}</div>
          </div>
        </div>
        
        <div class="check-info">
          <div class="check-row">
            <span class="check-label">最終確認:</span>
            <span class="check-value">{{ lastCheckTime }}</span>
          </div>
          <button class="btn btn-secondary btn-sm" @click="checkNow" :disabled="checking">
            {{ checking ? '確認中...' : '今すぐ確認' }}
          </button>
        </div>
      </div>
    </div>
    
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
    
    <div class="card">
      <h3 class="card-title">今後の機能拡張予定</h3>
      
      <ul class="feature-list">
        <li>ロゴ画像の変更機能</li>
        <li>チェックリストテンプレートのカスタマイズ</li>
        <li>写真添付機能（Android/Chrome優先）</li>
        <li>データのエクスポート/インポート</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import checklistTemplate from '@/assets/checklist.template.json'
import { initDB } from '@/stores/db'
import { COMPANY_SHORT_NAME } from '@/config/constants'

const templateName = ref(checklistTemplate.templateName)
const companyShortName = COMPANY_SHORT_NAME

// ネットワーク状態
const networkOnline = ref(navigator.onLine)
const isServerOnline = ref(false)
const serverUrl = ref(location.origin)
const lastCheckTime = ref('確認中...')
const checking = ref(false)

// サーバー接続確認
const checkServerConnection = async () => {
  checking.value = true
  
  try {
    // 配信元サーバーに接続確認
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5秒タイムアウト
    
    const response = await fetch(`${location.origin}/manifest.webmanifest`, {
      method: 'HEAD',
      cache: 'no-cache',
      signal: controller.signal,
      headers: {
        'X-Server-Check': Date.now().toString() // キャッシュ回避
      }
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      isServerOnline.value = true
      console.log('[Settings] Server connection: OK')
    } else {
      isServerOnline.value = false
      console.log('[Settings] Server connection: Failed (status:', response.status, ')')
    }
  } catch (error) {
    isServerOnline.value = false
    console.log('[Settings] Server connection: Failed (', error.message, ')')
  } finally {
    checking.value = false
    const now = new Date()
    lastCheckTime.value = now.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }
}

// 手動確認
const checkNow = () => {
  checkServerConnection()
}

// ネットワーク状態の監視
const updateNetworkStatus = () => {
  networkOnline.value = navigator.onLine
  if (!navigator.onLine) {
    isServerOnline.value = false
  } else {
    checkServerConnection()
  }
}

let intervalId = null

onMounted(() => {
  // 初回確認
  checkServerConnection()
  
  // 30秒ごとに自動確認
  intervalId = setInterval(checkServerConnection, 30000)
  
  // ネットワーク状態の変化を監視
  window.addEventListener('online', updateNetworkStatus)
  window.addEventListener('offline', updateNetworkStatus)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  window.removeEventListener('online', updateNetworkStatus)
  window.removeEventListener('offline', updateNetworkStatus)
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

/* ネットワーク状態表示 */
.network-status-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s;
}

.status-card.online {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border: 2px solid #10b981;
}

.status-card.offline {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 2px solid #ef4444;
}

.status-icon-large {
  font-size: 3rem;
  line-height: 1;
}

.status-info {
  flex: 1;
}

.status-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.status-card.online .status-title {
  color: #065f46;
}

.status-card.offline .status-title {
  color: #991b1b;
}

.status-description {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.status-card.online .status-description {
  color: #047857;
}

.status-card.offline .status-description {
  color: #dc2626;
}

.status-detail {
  font-size: 0.875rem;
  font-family: monospace;
}

.status-card.online .status-detail {
  color: #059669;
}

.status-card.offline .status-detail {
  color: #b91c1c;
}

.check-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.check-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.check-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.check-value {
  font-size: 0.875rem;
  font-weight: 500;
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

.feature-list {
  margin: 0 0 0 1.5rem;
  padding: 0;
  color: #4b5563;
}

.feature-list li {
  margin-bottom: 0.5rem;
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

