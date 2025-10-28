# アイコンをサンプルに変更する
_Exported on 2025/10/28 at 15:48:01 JST from Cursor (1.7.54)_

---

**User**

今のWorkCheckPWAOfflineを読み込んでください。
アイコンのところは、サンプルという会社名にしてもらえますか？

---

**Cursor**

現在のプロジェクトの状態を把握するため、関連ファイルを読み込みます。


アイコンSVGを直接確認中。


「株式会社」表記を含むファイルを確認し、必要箇所を「サンプル」に更新します。


「株式会社 B&Mテクノサービス」を「株式会社 サンプル」に置換します。


```vue
<template>
  <div id="app-container" class="app-container">
    <header v-if="!hideNav" class="app-header no-print">
      <div class="header-content">
        <img src="@/assets/logo.svg" alt="株式会社 サンプル" class="header-logo" />
        <h1 class="header-title">作業確認アプリ</h1>
      </div>
    </header>

    <nav v-if="!hideNav" class="app-nav no-print">
      <router-link to="/" :class="{ active: $route.name === 'Home' }">チェック</router-link>
      <router-link to="/history" :class="{ active: $route.name === 'History' }">履歴</router-link>
      <router-link to="/settings" :class="{ active: $route.name === 'Settings' }">設定</router-link>
    </nav>

    <main class="app-main">
      <router-view />
    </main>

    <footer v-if="!hideNav" class="app-footer no-print">
      <p>&copy; 株式会社 B&Mテクノサービス</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const hideNav = computed(() => route.meta.hideNav || false)
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  max-height: 48px;
  height: auto;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.app-nav {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.app-nav a {
  flex: 1;
  text-align: center;
  padding: 1rem;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.app-nav a:hover {
  background: #f9fafb;
  color: #2563eb;
}

.app-nav a.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  background: #eff6ff;
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
}

.app-footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

/* 印刷時のスタイル調整 */
@media print {
  .app-container {
    min-height: 0 !important;
    display: block !important;
  }
  
  .app-main {
    padding: 0 !important;
    margin: 0 !important;
    max-width: none !important;
  }
}

@media (max-width: 640px) {
  .header-title {
    font-size: 1.25rem;
  }
  
  .header-logo {
    max-height: 40px;
  }
  
  .app-main {
    padding: 1rem;
  }
}
</style>


```

```vue
<template>
  <div id="app-container" class="app-container">
    <header v-if="!hideNav" class="app-header no-print">
      <div class="header-content">
        <img src="@/assets/logo.svg" alt="株式会社 サンプル" class="header-logo" />
        <h1 class="header-title">作業確認アプリ</h1>
      </div>
    </header>

    <nav v-if="!hideNav" class="app-nav no-print">
      <router-link to="/" :class="{ active: $route.name === 'Home' }">チェック</router-link>
      <router-link to="/history" :class="{ active: $route.name === 'History' }">履歴</router-link>
      <router-link to="/settings" :class="{ active: $route.name === 'Settings' }">設定</router-link>
    </nav>

    <main class="app-main">
      <router-view />
    </main>

    <footer v-if="!hideNav" class="app-footer no-print">
      <p>&copy; 株式会社 サンプル</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const hideNav = computed(() => route.meta.hideNav || false)
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  max-height: 48px;
  height: auto;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.app-nav {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.app-nav a {
  flex: 1;
  text-align: center;
  padding: 1rem;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.app-nav a:hover {
  background: #f9fafb;
  color: #2563eb;
}

.app-nav a.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  background: #eff6ff;
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
}

.app-footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

/* 印刷時のスタイル調整 */
@media print {
  .app-container {
    min-height: 0 !important;
    display: block !important;
  }
  
  .app-main {
    padding: 0 !important;
    margin: 0 !important;
    max-width: none !important;
  }
}

@media (max-width: 640px) {
  .header-title {
    font-size: 1.25rem;
  }
  
  .header-logo {
    max-height: 40px;
  }
  
  .app-main {
    padding: 1rem;
  }
}
</style>


```

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="作業確認チェックリスト - 株式会社 サンプル">
  <meta name="theme-color" content="#2563eb">
  <link rel="manifest" href="/manifest.webmanifest">
  <title>作業確認アプリ - 株式会社 B&Mテクノサービス</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>


```

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="作業確認チェックリスト - 株式会社 サンプル">
  <meta name="theme-color" content="#2563eb">
  <link rel="manifest" href="/manifest.webmanifest">
  <title>作業確認アプリ - 株式会社 サンプル</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>


```

```json
{
  "name": "作業確認アプリ - 株式会社 サンプル",
  "short_name": "作業確認",
  "description": "現場作業チェックリストと署名によるPDF生成アプリ",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon.svg",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}


```

```vue
<template>
  <div class="print-sheet">
    <div v-if="loading" class="loading-message no-print">
      読み込み中...
    </div>
    
    <div v-else-if="error" class="error-message no-print">
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="goBack">戻る</button>
    </div>
    
    <div v-else class="print-content">
      <!-- 画面表示用ヘッダー（印刷時は非表示） -->
      <div class="screen-header no-print">
        <h2>印刷プレビュー</h2>
        <div class="screen-actions">
          <button class="btn btn-primary" @click="handlePrint">印刷</button>
          <button class="btn btn-secondary" @click="goBack">戻る</button>
        </div>
      </div>
      
      <!-- 印刷用ページ -->
      <div class="print-page">
        <!-- ヘッダー -->
        <div class="print-header">
          <div class="print-header-left">
            <img
              ref="logoRef"
              src="@/assets/logo.svg"
              alt="B&MTS"
              class="print-logo"
              @load="onImageLoad"
              @error="onImageError"
            />
            <div class="print-company-name">株式会社 サンプル</div>
          </div>
          <div class="print-header-right">
            <div>実行ID: {{ execution.id }}</div>
            <div>日付: {{ formatDate(execution.timestamp) }}</div>
          </div>
        </div>
        
        <!-- タイトル -->
        <h1 class="print-title">{{ execution.templateName }}</h1>
        
        <!-- 基本情報 -->
        <div class="print-meta">
          <div class="print-meta-row">
            <div class="print-meta-label">作業者:</div>
            <div class="print-meta-value">{{ execution.operatorName }}</div>
          </div>
          <div class="print-meta-row">
            <div class="print-meta-label">確認者:</div>
            <div class="print-meta-value">{{ execution.checkerName }}</div>
          </div>
        </div>
        
        <!-- チェックリスト -->
        <div class="print-checklist">
          <div
            v-for="item in checklistItems"
            :key="item.id"
            class="print-checklist-item"
          >
            <div
              class="print-check-box"
              :class="{ checked: execution.checklist[item.id]?.checked === true }"
              :title="`Debug: ${execution.checklist[item.id]?.checked}`"
            ></div>
            <div class="print-item-content">
              <div class="print-item-label">{{ item.label }}</div>
              <div
                v-if="item.hasRemark && execution.checklist[item.id]?.remark"
                class="print-item-remark"
              >
                備考: {{ execution.checklist[item.id].remark }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 署名 -->
        <div class="print-signatures">
          <div class="print-signature-box">
            <div class="print-signature-label">作業者署名</div>
            <div class="print-signature-name">{{ execution.operatorName }}</div>
            <img
              v-if="operatorSignature"
              ref="operatorSigRef"
              :src="operatorSignature"
              alt="作業者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
          <div class="print-signature-box">
            <div class="print-signature-label">確認者署名</div>
            <div class="print-signature-name">{{ execution.checkerName }}</div>
            <img
              v-if="checkerSignature"
              ref="checkerSigRef"
              :src="checkerSignature"
              alt="確認者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getExecution, getBlob } from '@/stores/db'
import checklistTemplate from '@/assets/checklist.template.json'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref(null)
const execution = ref(null)
const operatorSignature = ref(null)
const checkerSignature = ref(null)
const checklistItems = ref(checklistTemplate.items)

const logoRef = ref(null)
const operatorSigRef = ref(null)
const checkerSigRef = ref(null)

let imagesLoaded = 0
const totalImages = 3 // ロゴ + 2つの署名

// 画像読み込み完了
const onImageLoad = () => {
  imagesLoaded++
}

// 画像読み込みエラー
const onImageError = () => {
  console.warn('画像の読み込みに失敗しました')
  imagesLoaded++
}

// データ読み込み
const loadData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id
    
    // 実行データを取得
    execution.value = await getExecution(id)
    if (!execution.value) {
      throw new Error('指定された履歴が見つかりません')
    }
    
    // デバッグ: チェックリストデータを確認
    console.log('実行データ:', execution.value)
    console.log('チェックリストデータ:', execution.value.checklist)
    if (execution.value.checklist) {
      Object.keys(execution.value.checklist).forEach(key => {
        console.log(`項目 ${key}:`, execution.value.checklist[key])
      })
    }
    
    // 署名画像を取得
    operatorSignature.value = await getBlob(`${id}_operator_signature`)
    checkerSignature.value = await getBlob(`${id}_checker_signature`)
    
    // PDFファイル名用にドキュメントタイトルを設定
    const date = new Date(execution.value.timestamp)
    const formattedDate = date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '')
    const formattedTime = date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/:/g, '')
    document.title = `作業確認_${formattedDate}_${formattedTime}_${execution.value.id}`
    
  } catch (err) {
    console.error('データ読み込みエラー:', err)
    error.value = err.message || 'データの読み込みに失敗しました'
  } finally {
    loading.value = false
  }
}

// 日付フォーマット
const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 印刷
const handlePrint = () => {
  // 画像の読み込みを待つ
  const checkImagesLoaded = setInterval(() => {
    if (imagesLoaded >= totalImages) {
      clearInterval(checkImagesLoaded)
      window.print()
    }
  }, 100)
  
  // タイムアウト（5秒）
  setTimeout(() => {
    clearInterval(checkImagesLoaded)
    if (imagesLoaded < totalImages) {
      console.warn('一部の画像が読み込まれていませんが、印刷を続行します')
      window.print()
    }
  }, 5000)
}

// 戻る
const goBack = () => {
  router.back()
}

// 印刷ダイアログが閉じられた時の処理
const handleAfterPrint = () => {
  console.log('印刷ダイアログが閉じられました。前の画面に戻ります。')
  // 前の画面に戻る（チェック画面 or 履歴画面）
  router.back()
}

onMounted(() => {
  loadData()
  
  // 印刷後のイベントリスナーを追加
  window.addEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを登録しました')
})

onUnmounted(() => {
  // クリーンアップ
  window.removeEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを削除しました')
})
</script>

<style scoped>
.print-sheet {
  min-height: 100vh;
  transform: scale(0.8);
  transform-origin: top left;
  width: 125%;
}

.loading-message,
.error-message {
  text-align: center;
  padding: 3rem;
}

.error-message {
  color: #ef4444;
}

.print-content {
  position: relative;
}

.screen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.screen-actions {
  display: flex;
  gap: 1rem;
}

.print-page {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 210mm;
  margin: 0 auto;
}

/* 印刷画面でのロゴサイズ調整 */
.print-logo {
  height: 32px !important;
  width: auto !important;
}

/* チェックボックス表示の確認用スタイル */
.print-check-box {
  width: 18px;
  height: 18px;
  border: 2px solid #000;
  margin-right: 10px;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.print-check-box.checked {
  background-color: #000 !important;
  border-color: #000 !important;
}

.print-check-box.checked::after {
  content: "✓";
  color: white !important;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
}

/* 印刷時のスタイル */
@media print {
  .print-sheet {
    margin: 0 !important;
    padding: 0 !important;
    min-height: 0 !important;
    height: auto !important;
  }
  
  .print-content {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .print-page {
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    max-width: none !important;
    width: auto !important;
    height: auto !important;
  }
}

@media (max-width: 640px) {
  .screen-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .screen-actions {
    flex-direction: column;
  }
}

/* iOS専用の調整 */
@supports (-webkit-touch-callout: none) {
  .print-sheet {
    transform: scale(0.7);
    transform-origin: top left;
    width: 140%;
  }
  
  .print-signatures {
    flex-direction: column;
    gap: 5mm;
    align-items: center;
  }
  
  .print-signature-box {
    width: 100%;
    max-width: 60mm;
  }
  
  .print-signature-image {
    width: 50mm;
    max-height: 25mm;
  }
  
  .print-logo {
    height: 28px !important;
  }
}

/* 印刷時は元のサイズに戻す */
@media print {
  .print-sheet {
    transform: none !important;
    width: auto !important;
  }
  
  /* 印刷時は署名を横並びに戻す */
  .print-signatures {
    flex-direction: row !important;
    justify-content: center !important;
    gap: 10mm !important;
  }
  
  .print-signature-box {
    width: auto !important;
    max-width: 50mm !important;
  }
  
  .print-signature-image {
    width: 40mm !important;
    max-height: 30mm !important;
  }
}
</style>


```

アイコン画像のalt属性も更新します。


```vue
<template>
  <div class="print-sheet">
    <div v-if="loading" class="loading-message no-print">
      読み込み中...
    </div>
    
    <div v-else-if="error" class="error-message no-print">
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="goBack">戻る</button>
    </div>
    
    <div v-else class="print-content">
      <!-- 画面表示用ヘッダー（印刷時は非表示） -->
      <div class="screen-header no-print">
        <h2>印刷プレビュー</h2>
        <div class="screen-actions">
          <button class="btn btn-primary" @click="handlePrint">印刷</button>
          <button class="btn btn-secondary" @click="goBack">戻る</button>
        </div>
      </div>
      
      <!-- 印刷用ページ -->
      <div class="print-page">
        <!-- ヘッダー -->
        <div class="print-header">
          <div class="print-header-left">
            <img
              ref="logoRef"
              src="@/assets/logo.svg"
              alt="サンプル"
              class="print-logo"
              @load="onImageLoad"
              @error="onImageError"
            />
            <div class="print-company-name">株式会社 サンプル</div>
          </div>
          <div class="print-header-right">
            <div>実行ID: {{ execution.id }}</div>
            <div>日付: {{ formatDate(execution.timestamp) }}</div>
          </div>
        </div>
        
        <!-- タイトル -->
        <h1 class="print-title">{{ execution.templateName }}</h1>
        
        <!-- 基本情報 -->
        <div class="print-meta">
          <div class="print-meta-row">
            <div class="print-meta-label">作業者:</div>
            <div class="print-meta-value">{{ execution.operatorName }}</div>
          </div>
          <div class="print-meta-row">
            <div class="print-meta-label">確認者:</div>
            <div class="print-meta-value">{{ execution.checkerName }}</div>
          </div>
        </div>
        
        <!-- チェックリスト -->
        <div class="print-checklist">
          <div
            v-for="item in checklistItems"
            :key="item.id"
            class="print-checklist-item"
          >
            <div
              class="print-check-box"
              :class="{ checked: execution.checklist[item.id]?.checked === true }"
              :title="`Debug: ${execution.checklist[item.id]?.checked}`"
            ></div>
            <div class="print-item-content">
              <div class="print-item-label">{{ item.label }}</div>
              <div
                v-if="item.hasRemark && execution.checklist[item.id]?.remark"
                class="print-item-remark"
              >
                備考: {{ execution.checklist[item.id].remark }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 署名 -->
        <div class="print-signatures">
          <div class="print-signature-box">
            <div class="print-signature-label">作業者署名</div>
            <div class="print-signature-name">{{ execution.operatorName }}</div>
            <img
              v-if="operatorSignature"
              ref="operatorSigRef"
              :src="operatorSignature"
              alt="作業者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
          <div class="print-signature-box">
            <div class="print-signature-label">確認者署名</div>
            <div class="print-signature-name">{{ execution.checkerName }}</div>
            <img
              v-if="checkerSignature"
              ref="checkerSigRef"
              :src="checkerSignature"
              alt="確認者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getExecution, getBlob } from '@/stores/db'
import checklistTemplate from '@/assets/checklist.template.json'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref(null)
const execution = ref(null)
const operatorSignature = ref(null)
const checkerSignature = ref(null)
const checklistItems = ref(checklistTemplate.items)

const logoRef = ref(null)
const operatorSigRef = ref(null)
const checkerSigRef = ref(null)

let imagesLoaded = 0
const totalImages = 3 // ロゴ + 2つの署名

// 画像読み込み完了
const onImageLoad = () => {
  imagesLoaded++
}

// 画像読み込みエラー
const onImageError = () => {
  console.warn('画像の読み込みに失敗しました')
  imagesLoaded++
}

// データ読み込み
const loadData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id
    
    // 実行データを取得
    execution.value = await getExecution(id)
    if (!execution.value) {
      throw new Error('指定された履歴が見つかりません')
    }
    
    // デバッグ: チェックリストデータを確認
    console.log('実行データ:', execution.value)
    console.log('チェックリストデータ:', execution.value.checklist)
    if (execution.value.checklist) {
      Object.keys(execution.value.checklist).forEach(key => {
        console.log(`項目 ${key}:`, execution.value.checklist[key])
      })
    }
    
    // 署名画像を取得
    operatorSignature.value = await getBlob(`${id}_operator_signature`)
    checkerSignature.value = await getBlob(`${id}_checker_signature`)
    
    // PDFファイル名用にドキュメントタイトルを設定
    const date = new Date(execution.value.timestamp)
    const formattedDate = date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '')
    const formattedTime = date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/:/g, '')
    document.title = `作業確認_${formattedDate}_${formattedTime}_${execution.value.id}`
    
  } catch (err) {
    console.error('データ読み込みエラー:', err)
    error.value = err.message || 'データの読み込みに失敗しました'
  } finally {
    loading.value = false
  }
}

// 日付フォーマット
const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 印刷
const handlePrint = () => {
  // 画像の読み込みを待つ
  const checkImagesLoaded = setInterval(() => {
    if (imagesLoaded >= totalImages) {
      clearInterval(checkImagesLoaded)
      window.print()
    }
  }, 100)
  
  // タイムアウト（5秒）
  setTimeout(() => {
    clearInterval(checkImagesLoaded)
    if (imagesLoaded < totalImages) {
      console.warn('一部の画像が読み込まれていませんが、印刷を続行します')
      window.print()
    }
  }, 5000)
}

// 戻る
const goBack = () => {
  router.back()
}

// 印刷ダイアログが閉じられた時の処理
const handleAfterPrint = () => {
  console.log('印刷ダイアログが閉じられました。前の画面に戻ります。')
  // 前の画面に戻る（チェック画面 or 履歴画面）
  router.back()
}

onMounted(() => {
  loadData()
  
  // 印刷後のイベントリスナーを追加
  window.addEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを登録しました')
})

onUnmounted(() => {
  // クリーンアップ
  window.removeEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを削除しました')
})
</script>

<style scoped>
.print-sheet {
  min-height: 100vh;
  transform: scale(0.8);
  transform-origin: top left;
  width: 125%;
}

.loading-message,
.error-message {
  text-align: center;
  padding: 3rem;
}

.error-message {
  color: #ef4444;
}

.print-content {
  position: relative;
}

.screen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.screen-actions {
  display: flex;
  gap: 1rem;
}

.print-page {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 210mm;
  margin: 0 auto;
}

/* 印刷画面でのロゴサイズ調整 */
.print-logo {
  height: 32px !important;
  width: auto !important;
}

/* チェックボックス表示の確認用スタイル */
.print-check-box {
  width: 18px;
  height: 18px;
  border: 2px solid #000;
  margin-right: 10px;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.print-check-box.checked {
  background-color: #000 !important;
  border-color: #000 !important;
}

.print-check-box.checked::after {
  content: "✓";
  color: white !important;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
}

/* 印刷時のスタイル */
@media print {
  .print-sheet {
    margin: 0 !important;
    padding: 0 !important;
    min-height: 0 !important;
    height: auto !important;
  }
  
  .print-content {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .print-page {
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    max-width: none !important;
    width: auto !important;
    height: auto !important;
  }
}

@media (max-width: 640px) {
  .screen-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .screen-actions {
    flex-direction: column;
  }
}

/* iOS専用の調整 */
@supports (-webkit-touch-callout: none) {
  .print-sheet {
    transform: scale(0.7);
    transform-origin: top left;
    width: 140%;
  }
  
  .print-signatures {
    flex-direction: column;
    gap: 5mm;
    align-items: center;
  }
  
  .print-signature-box {
    width: 100%;
    max-width: 60mm;
  }
  
  .print-signature-image {
    width: 50mm;
    max-height: 25mm;
  }
  
  .print-logo {
    height: 28px !important;
  }
}

/* 印刷時は元のサイズに戻す */
@media print {
  .print-sheet {
    transform: none !important;
    width: auto !important;
  }
  
  /* 印刷時は署名を横並びに戻す */
  .print-signatures {
    flex-direction: row !important;
    justify-content: center !important;
    gap: 10mm !important;
  }
  
  .print-signature-box {
    width: auto !important;
    max-width: 50mm !important;
  }
  
  .print-signature-image {
    width: 40mm !important;
    max-height: 30mm !important;
  }
}
</style>


```

修正完了。会社名を「株式会社 B&Mテクノサービス」から「株式会社 サンプル」に変更しました。

変更箇所：
1. `src/App.vue` - ヘッダーのロゴalt属性とフッター
2. `index.html` - メタdescriptionとtitle
3. `public/manifest.webmanifest` - アプリ名
4. `src/views/PrintSheet.vue` - 印刷画面の会社名とロゴalt属性

他にも「株式会社 B&Mテクノサービス」の表記があれば知らせてください。

---

**User**

社名は定数でどのファイルかにまとめて定義してほしいです。
アプリ情報の会社名にB&MTSがこれもSAMPLEにしてほしいです。
あと、実行IDのBMは、SMPにしてほしいです。
アイコンも変更したいです。Sampleの文字にしてほしいです。

---

**Cursor**

社名・実行IDプレフィックスを定数化し、アイコンを「Sample」表示に更新します。


定数ファイルを作成し、社名と実行IDプレフィックスを定義します。


```javascript
/**
 * アプリケーション定数
 */

// 会社名
export const COMPANY_NAME = '株式会社 サンプル'
export const COMPANY_SHORT_NAME = 'SAMPLE'

// 実行IDプレフィックス
export const RUN_ID_PREFIX = 'SMP'

// アプリケーション情報
export const APP_NAME = '作業確認アプリ'
export const APP_VERSION = 'v0.3.0'
export const APP_SHORT_NAME = '作業確認'

```

各ファイルでこの定数を使用するように変更します。


```javascript
import { getNextRunNumber } from '@/stores/db'
import { RUN_ID_PREFIX } from '@/config/constants'

/**
 * 実行ID生成（SMP-YYYYMMDD-NNN形式）
 * @returns {Promise<string>} 実行ID
 */
export async function generateRunId() {
  try {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const dateStr = `${year}${month}${day}`
    
    console.log('日付文字列:', dateStr)
    
    // 当日の連番を取得
    const num = await getNextRunNumber(dateStr)
    console.log('連番:', num)
    
    const numStr = String(num).padStart(3, '0')
    const runId = `${RUN_ID_PREFIX}-${dateStr}-${numStr}`
    
    console.log('生成された実行ID:', runId)
    return runId
  } catch (error) {
    console.error('実行ID生成エラー:', error)
    throw new Error(`実行IDの生成に失敗しました: ${error.message}`)
  }
}

/**
 * 実行IDから表示用の日付文字列を生成
 * @param {string} runId - 実行ID（SMP-YYYYMMDD-NNN）
 * @returns {string} 日付文字列（YYYY-MM-DD）
 */
export function formatDateFromRunId(runId) {
  const match = runId.match(/SMP-(\d{4})(\d{2})(\d{2})-\d{3}/)
  if (!match) return ''
  return `${match[1]}-${match[2]}-${match[3]}`
}

/**
 * PDFファイル名を生成
 * @param {string} runId - 実行ID
 * @returns {string} ファイル名
 */
export function generatePdfFileName(runId) {
  const dateStr = formatDateFromRunId(runId)
  return `WorkCheck_${dateStr}_${runId}.pdf`
}


```

```vue
<template>
  <div id="app-container" class="app-container">
    <header v-if="!hideNav" class="app-header no-print">
      <div class="header-content">
        <img src="@/assets/logo.svg" alt="株式会社 サンプル" class="header-logo" />
        <h1 class="header-title">作業確認アプリ</h1>
      </div>
    </header>

    <nav v-if="!hideNav" class="app-nav no-print">
      <router-link to="/" :class="{ active: $route.name === 'Home' }">チェック</router-link>
      <router-link to="/history" :class="{ active: $route.name === 'History' }">履歴</router-link>
      <router-link to="/settings" :class="{ active: $route.name === 'Settings' }">設定</router-link>
    </nav>

    <main class="app-main">
      <router-view />
    </main>

    <footer v-if="!hideNav" class="app-footer no-print">
      <p>&copy; 株式会社 サンプル</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { COMPANY_NAME } from '@/config/constants'

const route = useRoute()
const hideNav = computed(() => route.meta.hideNav || false)

// 会社名を使用
const companyName = COMPANY_NAME
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  max-height: 48px;
  height: auto;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.app-nav {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.app-nav a {
  flex: 1;
  text-align: center;
  padding: 1rem;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.app-nav a:hover {
  background: #f9fafb;
  color: #2563eb;
}

.app-nav a.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  background: #eff6ff;
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
}

.app-footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

/* 印刷時のスタイル調整 */
@media print {
  .app-container {
    min-height: 0 !important;
    display: block !important;
  }
  
  .app-main {
    padding: 0 !important;
    margin: 0 !important;
    max-width: none !important;
  }
}

@media (max-width: 640px) {
  .header-title {
    font-size: 1.25rem;
  }
  
  .header-logo {
    max-height: 40px;
  }
  
  .app-main {
    padding: 1rem;
  }
}
</style>


```

```vue
<template>
  <div id="app-container" class="app-container">
    <header v-if="!hideNav" class="app-header no-print">
      <div class="header-content">
        <img src="@/assets/logo.svg" :alt="companyName" class="header-logo" />
        <h1 class="header-title">作業確認アプリ</h1>
      </div>
    </header>

    <nav v-if="!hideNav" class="app-nav no-print">
      <router-link to="/" :class="{ active: $route.name === 'Home' }">チェック</router-link>
      <router-link to="/history" :class="{ active: $route.name === 'History' }">履歴</router-link>
      <router-link to="/settings" :class="{ active: $route.name === 'Settings' }">設定</router-link>
    </nav>

    <main class="app-main">
      <router-view />
    </main>

    <footer v-if="!hideNav" class="app-footer no-print">
      <p>&copy; 株式会社 サンプル</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { COMPANY_NAME } from '@/config/constants'

const route = useRoute()
const hideNav = computed(() => route.meta.hideNav || false)

// 会社名を使用
const companyName = COMPANY_NAME
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  max-height: 48px;
  height: auto;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.app-nav {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.app-nav a {
  flex: 1;
  text-align: center;
  padding: 1rem;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.app-nav a:hover {
  background: #f9fafb;
  color: #2563eb;
}

.app-nav a.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  background: #eff6ff;
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
}

.app-footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

/* 印刷時のスタイル調整 */
@media print {
  .app-container {
    min-height: 0 !important;
    display: block !important;
  }
  
  .app-main {
    padding: 0 !important;
    margin: 0 !important;
    max-width: none !important;
  }
}

@media (max-width: 640px) {
  .header-title {
    font-size: 1.25rem;
  }
  
  .header-logo {
    max-height: 40px;
  }
  
  .app-main {
    padding: 1rem;
  }
}
</style>


```

```vue
<template>
  <div id="app-container" class="app-container">
    <header v-if="!hideNav" class="app-header no-print">
      <div class="header-content">
        <img src="@/assets/logo.svg" :alt="companyName" class="header-logo" />
        <h1 class="header-title">作業確認アプリ</h1>
      </div>
    </header>

    <nav v-if="!hideNav" class="app-nav no-print">
      <router-link to="/" :class="{ active: $route.name === 'Home' }">チェック</router-link>
      <router-link to="/history" :class="{ active: $route.name === 'History' }">履歴</router-link>
      <router-link to="/settings" :class="{ active: $route.name === 'Settings' }">設定</router-link>
    </nav>

    <main class="app-main">
      <router-view />
    </main>

    <footer v-if="!hideNav" class="app-footer no-print">
      <p>&copy; {{ companyName }}</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { COMPANY_NAME } from '@/config/constants'

const route = useRoute()
const hideNav = computed(() => route.meta.hideNav || false)

// 会社名を使用
const companyName = COMPANY_NAME
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  max-height: 48px;
  height: auto;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.app-nav {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.app-nav a {
  flex: 1;
  text-align: center;
  padding: 1rem;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.app-nav a:hover {
  background: #f9fafb;
  color: #2563eb;
}

.app-nav a.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  background: #eff6ff;
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
}

.app-footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

/* 印刷時のスタイル調整 */
@media print {
  .app-container {
    min-height: 0 !important;
    display: block !important;
  }
  
  .app-main {
    padding: 0 !important;
    margin: 0 !important;
    max-width: none !important;
  }
}

@media (max-width: 640px) {
  .header-title {
    font-size: 1.25rem;
  }
  
  .header-logo {
    max-height: 40px;
  }
  
  .app-main {
    padding: 1rem;
  }
}
</style>


```

他のファイルも更新します。


```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="作業確認チェックリスト">
  <meta name="theme-color" content="#2563eb">
  <link rel="manifest" href="/manifest.webmanifest">
  <title>作業確認アプリ</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>


```

```json
{
  "name": "作業確認アプリ",
  "short_name": "作業確認",
  "description": "現場作業チェックリストと署名によるPDF生成アプリ",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon.svg",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}


```

```vue
<template>
  <div class="print-sheet">
    <div v-if="loading" class="loading-message no-print">
      読み込み中...
    </div>
    
    <div v-else-if="error" class="error-message no-print">
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="goBack">戻る</button>
    </div>
    
    <div v-else class="print-content">
      <!-- 画面表示用ヘッダー（印刷時は非表示） -->
      <div class="screen-header no-print">
        <h2>印刷プレビュー</h2>
        <div class="screen-actions">
          <button class="btn btn-primary" @click="handlePrint">印刷</button>
          <button class="btn btn-secondary" @click="goBack">戻る</button>
        </div>
      </div>
      
      <!-- 印刷用ページ -->
      <div class="print-page">
        <!-- ヘッダー -->
        <div class="print-header">
          <div class="print-header-left">
            <img
              ref="logoRef"
              src="@/assets/logo.svg"
              alt="サンプル"
              class="print-logo"
              @load="onImageLoad"
              @error="onImageError"
            />
            <div class="print-company-name">株式会社 サンプル</div>
          </div>
          <div class="print-header-right">
            <div>実行ID: {{ execution.id }}</div>
            <div>日付: {{ formatDate(execution.timestamp) }}</div>
          </div>
        </div>
        
        <!-- タイトル -->
        <h1 class="print-title">{{ execution.templateName }}</h1>
        
        <!-- 基本情報 -->
        <div class="print-meta">
          <div class="print-meta-row">
            <div class="print-meta-label">作業者:</div>
            <div class="print-meta-value">{{ execution.operatorName }}</div>
          </div>
          <div class="print-meta-row">
            <div class="print-meta-label">確認者:</div>
            <div class="print-meta-value">{{ execution.checkerName }}</div>
          </div>
        </div>
        
        <!-- チェックリスト -->
        <div class="print-checklist">
          <div
            v-for="item in checklistItems"
            :key="item.id"
            class="print-checklist-item"
          >
            <div
              class="print-check-box"
              :class="{ checked: execution.checklist[item.id]?.checked === true }"
              :title="`Debug: ${execution.checklist[item.id]?.checked}`"
            ></div>
            <div class="print-item-content">
              <div class="print-item-label">{{ item.label }}</div>
              <div
                v-if="item.hasRemark && execution.checklist[item.id]?.remark"
                class="print-item-remark"
              >
                備考: {{ execution.checklist[item.id].remark }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 署名 -->
        <div class="print-signatures">
          <div class="print-signature-box">
            <div class="print-signature-label">作業者署名</div>
            <div class="print-signature-name">{{ execution.operatorName }}</div>
            <img
              v-if="operatorSignature"
              ref="operatorSigRef"
              :src="operatorSignature"
              alt="作業者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
          <div class="print-signature-box">
            <div class="print-signature-label">確認者署名</div>
            <div class="print-signature-name">{{ execution.checkerName }}</div>
            <img
              v-if="checkerSignature"
              ref="checkerSigRef"
              :src="checkerSignature"
              alt="確認者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getExecution, getBlob } from '@/stores/db'
import checklistTemplate from '@/assets/checklist.template.json'
import { COMPANY_NAME } from '@/config/constants'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref(null)
const execution = ref(null)
const operatorSignature = ref(null)
const checkerSignature = ref(null)
const checklistItems = ref(checklistTemplate.items)

const logoRef = ref(null)
const operatorSigRef = ref(null)
const checkerSigRef = ref(null)

let imagesLoaded = 0
const totalImages = 3 // ロゴ + 2つの署名

// 画像読み込み完了
const onImageLoad = () => {
  imagesLoaded++
}

// 画像読み込みエラー
const onImageError = () => {
  console.warn('画像の読み込みに失敗しました')
  imagesLoaded++
}

// データ読み込み
const loadData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id
    
    // 実行データを取得
    execution.value = await getExecution(id)
    if (!execution.value) {
      throw new Error('指定された履歴が見つかりません')
    }
    
    // デバッグ: チェックリストデータを確認
    console.log('実行データ:', execution.value)
    console.log('チェックリストデータ:', execution.value.checklist)
    if (execution.value.checklist) {
      Object.keys(execution.value.checklist).forEach(key => {
        console.log(`項目 ${key}:`, execution.value.checklist[key])
      })
    }
    
    // 署名画像を取得
    operatorSignature.value = await getBlob(`${id}_operator_signature`)
    checkerSignature.value = await getBlob(`${id}_checker_signature`)
    
    // PDFファイル名用にドキュメントタイトルを設定
    const date = new Date(execution.value.timestamp)
    const formattedDate = date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '')
    const formattedTime = date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/:/g, '')
    document.title = `作業確認_${formattedDate}_${formattedTime}_${execution.value.id}`
    
  } catch (err) {
    console.error('データ読み込みエラー:', err)
    error.value = err.message || 'データの読み込みに失敗しました'
  } finally {
    loading.value = false
  }
}

// 日付フォーマット
const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 印刷
const handlePrint = () => {
  // 画像の読み込みを待つ
  const checkImagesLoaded = setInterval(() => {
    if (imagesLoaded >= totalImages) {
      clearInterval(checkImagesLoaded)
      window.print()
    }
  }, 100)
  
  // タイムアウト（5秒）
  setTimeout(() => {
    clearInterval(checkImagesLoaded)
    if (imagesLoaded < totalImages) {
      console.warn('一部の画像が読み込まれていませんが、印刷を続行します')
      window.print()
    }
  }, 5000)
}

// 戻る
const goBack = () => {
  router.back()
}

// 印刷ダイアログが閉じられた時の処理
const handleAfterPrint = () => {
  console.log('印刷ダイアログが閉じられました。前の画面に戻ります。')
  // 前の画面に戻る（チェック画面 or 履歴画面）
  router.back()
}

onMounted(() => {
  loadData()
  
  // 印刷後のイベントリスナーを追加
  window.addEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを登録しました')
})

onUnmounted(() => {
  // クリーンアップ
  window.removeEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを削除しました')
})
</script>

<style scoped>
.print-sheet {
  min-height: 100vh;
  transform: scale(0.8);
  transform-origin: top left;
  width: 125%;
}

.loading-message,
.error-message {
  text-align: center;
  padding: 3rem;
}

.error-message {
  color: #ef4444;
}

.print-content {
  position: relative;
}

.screen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.screen-actions {
  display: flex;
  gap: 1rem;
}

.print-page {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 210mm;
  margin: 0 auto;
}

/* 印刷画面でのロゴサイズ調整 */
.print-logo {
  height: 32px !important;
  width: auto !important;
}

/* チェックボックス表示の確認用スタイル */
.print-check-box {
  width: 18px;
  height: 18px;
  border: 2px solid #000;
  margin-right: 10px;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.print-check-box.checked {
  background-color: #000 !important;
  border-color: #000 !important;
}

.print-check-box.checked::after {
  content: "✓";
  color: white !important;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
}

/* 印刷時のスタイル */
@media print {
  .print-sheet {
    margin: 0 !important;
    padding: 0 !important;
    min-height: 0 !important;
    height: auto !important;
  }
  
  .print-content {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .print-page {
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    max-width: none !important;
    width: auto !important;
    height: auto !important;
  }
}

@media (max-width: 640px) {
  .screen-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .screen-actions {
    flex-direction: column;
  }
}

/* iOS専用の調整 */
@supports (-webkit-touch-callout: none) {
  .print-sheet {
    transform: scale(0.7);
    transform-origin: top left;
    width: 140%;
  }
  
  .print-signatures {
    flex-direction: column;
    gap: 5mm;
    align-items: center;
  }
  
  .print-signature-box {
    width: 100%;
    max-width: 60mm;
  }
  
  .print-signature-image {
    width: 50mm;
    max-height: 25mm;
  }
  
  .print-logo {
    height: 28px !important;
  }
}

/* 印刷時は元のサイズに戻す */
@media print {
  .print-sheet {
    transform: none !important;
    width: auto !important;
  }
  
  /* 印刷時は署名を横並びに戻す */
  .print-signatures {
    flex-direction: row !important;
    justify-content: center !important;
    gap: 10mm !important;
  }
  
  .print-signature-box {
    width: auto !important;
    max-width: 50mm !important;
  }
  
  .print-signature-image {
    width: 40mm !important;
    max-height: 30mm !important;
  }
}
</style>


```

```vue
<template>
  <div class="print-sheet">
    <div v-if="loading" class="loading-message no-print">
      読み込み中...
    </div>
    
    <div v-else-if="error" class="error-message no-print">
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="goBack">戻る</button>
    </div>
    
    <div v-else class="print-content">
      <!-- 画面表示用ヘッダー（印刷時は非表示） -->
      <div class="screen-header no-print">
        <h2>印刷プレビュー</h2>
        <div class="screen-actions">
          <button class="btn btn-primary" @click="handlePrint">印刷</button>
          <button class="btn btn-secondary" @click="goBack">戻る</button>
        </div>
      </div>
      
      <!-- 印刷用ページ -->
      <div class="print-page">
        <!-- ヘッダー -->
        <div class="print-header">
          <div class="print-header-left">
            <img
              ref="logoRef"
              src="@/assets/logo.svg"
              :alt="companyName"
              class="print-logo"
              @load="onImageLoad"
              @error="onImageError"
            />
            <div class="print-company-name">株式会社 サンプル</div>
          </div>
          <div class="print-header-right">
            <div>実行ID: {{ execution.id }}</div>
            <div>日付: {{ formatDate(execution.timestamp) }}</div>
          </div>
        </div>
        
        <!-- タイトル -->
        <h1 class="print-title">{{ execution.templateName }}</h1>
        
        <!-- 基本情報 -->
        <div class="print-meta">
          <div class="print-meta-row">
            <div class="print-meta-label">作業者:</div>
            <div class="print-meta-value">{{ execution.operatorName }}</div>
          </div>
          <div class="print-meta-row">
            <div class="print-meta-label">確認者:</div>
            <div class="print-meta-value">{{ execution.checkerName }}</div>
          </div>
        </div>
        
        <!-- チェックリスト -->
        <div class="print-checklist">
          <div
            v-for="item in checklistItems"
            :key="item.id"
            class="print-checklist-item"
          >
            <div
              class="print-check-box"
              :class="{ checked: execution.checklist[item.id]?.checked === true }"
              :title="`Debug: ${execution.checklist[item.id]?.checked}`"
            ></div>
            <div class="print-item-content">
              <div class="print-item-label">{{ item.label }}</div>
              <div
                v-if="item.hasRemark && execution.checklist[item.id]?.remark"
                class="print-item-remark"
              >
                備考: {{ execution.checklist[item.id].remark }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 署名 -->
        <div class="print-signatures">
          <div class="print-signature-box">
            <div class="print-signature-label">作業者署名</div>
            <div class="print-signature-name">{{ execution.operatorName }}</div>
            <img
              v-if="operatorSignature"
              ref="operatorSigRef"
              :src="operatorSignature"
              alt="作業者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
          <div class="print-signature-box">
            <div class="print-signature-label">確認者署名</div>
            <div class="print-signature-name">{{ execution.checkerName }}</div>
            <img
              v-if="checkerSignature"
              ref="checkerSigRef"
              :src="checkerSignature"
              alt="確認者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getExecution, getBlob } from '@/stores/db'
import checklistTemplate from '@/assets/checklist.template.json'
import { COMPANY_NAME } from '@/config/constants'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref(null)
const execution = ref(null)
const operatorSignature = ref(null)
const checkerSignature = ref(null)
const checklistItems = ref(checklistTemplate.items)

const logoRef = ref(null)
const operatorSigRef = ref(null)
const checkerSigRef = ref(null)

let imagesLoaded = 0
const totalImages = 3 // ロゴ + 2つの署名

// 画像読み込み完了
const onImageLoad = () => {
  imagesLoaded++
}

// 画像読み込みエラー
const onImageError = () => {
  console.warn('画像の読み込みに失敗しました')
  imagesLoaded++
}

// データ読み込み
const loadData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id
    
    // 実行データを取得
    execution.value = await getExecution(id)
    if (!execution.value) {
      throw new Error('指定された履歴が見つかりません')
    }
    
    // デバッグ: チェックリストデータを確認
    console.log('実行データ:', execution.value)
    console.log('チェックリストデータ:', execution.value.checklist)
    if (execution.value.checklist) {
      Object.keys(execution.value.checklist).forEach(key => {
        console.log(`項目 ${key}:`, execution.value.checklist[key])
      })
    }
    
    // 署名画像を取得
    operatorSignature.value = await getBlob(`${id}_operator_signature`)
    checkerSignature.value = await getBlob(`${id}_checker_signature`)
    
    // PDFファイル名用にドキュメントタイトルを設定
    const date = new Date(execution.value.timestamp)
    const formattedDate = date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '')
    const formattedTime = date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/:/g, '')
    document.title = `作業確認_${formattedDate}_${formattedTime}_${execution.value.id}`
    
  } catch (err) {
    console.error('データ読み込みエラー:', err)
    error.value = err.message || 'データの読み込みに失敗しました'
  } finally {
    loading.value = false
  }
}

// 日付フォーマット
const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 印刷
const handlePrint = () => {
  // 画像の読み込みを待つ
  const checkImagesLoaded = setInterval(() => {
    if (imagesLoaded >= totalImages) {
      clearInterval(checkImagesLoaded)
      window.print()
    }
  }, 100)
  
  // タイムアウト（5秒）
  setTimeout(() => {
    clearInterval(checkImagesLoaded)
    if (imagesLoaded < totalImages) {
      console.warn('一部の画像が読み込まれていませんが、印刷を続行します')
      window.print()
    }
  }, 5000)
}

// 戻る
const goBack = () => {
  router.back()
}

// 印刷ダイアログが閉じられた時の処理
const handleAfterPrint = () => {
  console.log('印刷ダイアログが閉じられました。前の画面に戻ります。')
  // 前の画面に戻る（チェック画面 or 履歴画面）
  router.back()
}

onMounted(() => {
  loadData()
  
  // 印刷後のイベントリスナーを追加
  window.addEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを登録しました')
})

onUnmounted(() => {
  // クリーンアップ
  window.removeEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを削除しました')
})
</script>

<style scoped>
.print-sheet {
  min-height: 100vh;
  transform: scale(0.8);
  transform-origin: top left;
  width: 125%;
}

.loading-message,
.error-message {
  text-align: center;
  padding: 3rem;
}

.error-message {
  color: #ef4444;
}

.print-content {
  position: relative;
}

.screen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.screen-actions {
  display: flex;
  gap: 1rem;
}

.print-page {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 210mm;
  margin: 0 auto;
}

/* 印刷画面でのロゴサイズ調整 */
.print-logo {
  height: 32px !important;
  width: auto !important;
}

/* チェックボックス表示の確認用スタイル */
.print-check-box {
  width: 18px;
  height: 18px;
  border: 2px solid #000;
  margin-right: 10px;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.print-check-box.checked {
  background-color: #000 !important;
  border-color: #000 !important;
}

.print-check-box.checked::after {
  content: "✓";
  color: white !important;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
}

/* 印刷時のスタイル */
@media print {
  .print-sheet {
    margin: 0 !important;
    padding: 0 !important;
    min-height: 0 !important;
    height: auto !important;
  }
  
  .print-content {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .print-page {
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    max-width: none !important;
    width: auto !important;
    height: auto !important;
  }
}

@media (max-width: 640px) {
  .screen-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .screen-actions {
    flex-direction: column;
  }
}

/* iOS専用の調整 */
@supports (-webkit-touch-callout: none) {
  .print-sheet {
    transform: scale(0.7);
    transform-origin: top left;
    width: 140%;
  }
  
  .print-signatures {
    flex-direction: column;
    gap: 5mm;
    align-items: center;
  }
  
  .print-signature-box {
    width: 100%;
    max-width: 60mm;
  }
  
  .print-signature-image {
    width: 50mm;
    max-height: 25mm;
  }
  
  .print-logo {
    height: 28px !important;
  }
}

/* 印刷時は元のサイズに戻す */
@media print {
  .print-sheet {
    transform: none !important;
    width: auto !important;
  }
  
  /* 印刷時は署名を横並びに戻す */
  .print-signatures {
    flex-direction: row !important;
    justify-content: center !important;
    gap: 10mm !important;
  }
  
  .print-signature-box {
    width: auto !important;
    max-width: 50mm !important;
  }
  
  .print-signature-image {
    width: 40mm !important;
    max-height: 30mm !important;
  }
}
</style>


```

```vue
<template>
  <div class="print-sheet">
    <div v-if="loading" class="loading-message no-print">
      読み込み中...
    </div>
    
    <div v-else-if="error" class="error-message no-print">
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="goBack">戻る</button>
    </div>
    
    <div v-else class="print-content">
      <!-- 画面表示用ヘッダー（印刷時は非表示） -->
      <div class="screen-header no-print">
        <h2>印刷プレビュー</h2>
        <div class="screen-actions">
          <button class="btn btn-primary" @click="handlePrint">印刷</button>
          <button class="btn btn-secondary" @click="goBack">戻る</button>
        </div>
      </div>
      
      <!-- 印刷用ページ -->
      <div class="print-page">
        <!-- ヘッダー -->
        <div class="print-header">
          <div class="print-header-left">
            <img
              ref="logoRef"
              src="@/assets/logo.svg"
              :alt="companyName"
              class="print-logo"
              @load="onImageLoad"
              @error="onImageError"
            />
            <div class="print-company-name">{{ companyName }}</div>
          </div>
          <div class="print-header-right">
            <div>実行ID: {{ execution.id }}</div>
            <div>日付: {{ formatDate(execution.timestamp) }}</div>
          </div>
        </div>
        
        <!-- タイトル -->
        <h1 class="print-title">{{ execution.templateName }}</h1>
        
        <!-- 基本情報 -->
        <div class="print-meta">
          <div class="print-meta-row">
            <div class="print-meta-label">作業者:</div>
            <div class="print-meta-value">{{ execution.operatorName }}</div>
          </div>
          <div class="print-meta-row">
            <div class="print-meta-label">確認者:</div>
            <div class="print-meta-value">{{ execution.checkerName }}</div>
          </div>
        </div>
        
        <!-- チェックリスト -->
        <div class="print-checklist">
          <div
            v-for="item in checklistItems"
            :key="item.id"
            class="print-checklist-item"
          >
            <div
              class="print-check-box"
              :class="{ checked: execution.checklist[item.id]?.checked === true }"
              :title="`Debug: ${execution.checklist[item.id]?.checked}`"
            ></div>
            <div class="print-item-content">
              <div class="print-item-label">{{ item.label }}</div>
              <div
                v-if="item.hasRemark && execution.checklist[item.id]?.remark"
                class="print-item-remark"
              >
                備考: {{ execution.checklist[item.id].remark }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 署名 -->
        <div class="print-signatures">
          <div class="print-signature-box">
            <div class="print-signature-label">作業者署名</div>
            <div class="print-signature-name">{{ execution.operatorName }}</div>
            <img
              v-if="operatorSignature"
              ref="operatorSigRef"
              :src="operatorSignature"
              alt="作業者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
          <div class="print-signature-box">
            <div class="print-signature-label">確認者署名</div>
            <div class="print-signature-name">{{ execution.checkerName }}</div>
            <img
              v-if="checkerSignature"
              ref="checkerSigRef"
              :src="checkerSignature"
              alt="確認者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getExecution, getBlob } from '@/stores/db'
import checklistTemplate from '@/assets/checklist.template.json'
import { COMPANY_NAME } from '@/config/constants'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref(null)
const execution = ref(null)
const operatorSignature = ref(null)
const checkerSignature = ref(null)
const checklistItems = ref(checklistTemplate.items)

const logoRef = ref(null)
const operatorSigRef = ref(null)
const checkerSigRef = ref(null)

let imagesLoaded = 0
const totalImages = 3 // ロゴ + 2つの署名

// 画像読み込み完了
const onImageLoad = () => {
  imagesLoaded++
}

// 画像読み込みエラー
const onImageError = () => {
  console.warn('画像の読み込みに失敗しました')
  imagesLoaded++
}

// データ読み込み
const loadData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id
    
    // 実行データを取得
    execution.value = await getExecution(id)
    if (!execution.value) {
      throw new Error('指定された履歴が見つかりません')
    }
    
    // デバッグ: チェックリストデータを確認
    console.log('実行データ:', execution.value)
    console.log('チェックリストデータ:', execution.value.checklist)
    if (execution.value.checklist) {
      Object.keys(execution.value.checklist).forEach(key => {
        console.log(`項目 ${key}:`, execution.value.checklist[key])
      })
    }
    
    // 署名画像を取得
    operatorSignature.value = await getBlob(`${id}_operator_signature`)
    checkerSignature.value = await getBlob(`${id}_checker_signature`)
    
    // PDFファイル名用にドキュメントタイトルを設定
    const date = new Date(execution.value.timestamp)
    const formattedDate = date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '')
    const formattedTime = date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/:/g, '')
    document.title = `作業確認_${formattedDate}_${formattedTime}_${execution.value.id}`
    
  } catch (err) {
    console.error('データ読み込みエラー:', err)
    error.value = err.message || 'データの読み込みに失敗しました'
  } finally {
    loading.value = false
  }
}

// 日付フォーマット
const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 印刷
const handlePrint = () => {
  // 画像の読み込みを待つ
  const checkImagesLoaded = setInterval(() => {
    if (imagesLoaded >= totalImages) {
      clearInterval(checkImagesLoaded)
      window.print()
    }
  }, 100)
  
  // タイムアウト（5秒）
  setTimeout(() => {
    clearInterval(checkImagesLoaded)
    if (imagesLoaded < totalImages) {
      console.warn('一部の画像が読み込まれていませんが、印刷を続行します')
      window.print()
    }
  }, 5000)
}

// 戻る
const goBack = () => {
  router.back()
}

// 印刷ダイアログが閉じられた時の処理
const handleAfterPrint = () => {
  console.log('印刷ダイアログが閉じられました。前の画面に戻ります。')
  // 前の画面に戻る（チェック画面 or 履歴画面）
  router.back()
}

onMounted(() => {
  loadData()
  
  // 印刷後のイベントリスナーを追加
  window.addEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを登録しました')
})

onUnmounted(() => {
  // クリーンアップ
  window.removeEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを削除しました')
})
</script>

<style scoped>
.print-sheet {
  min-height: 100vh;
  transform: scale(0.8);
  transform-origin: top left;
  width: 125%;
}

.loading-message,
.error-message {
  text-align: center;
  padding: 3rem;
}

.error-message {
  color: #ef4444;
}

.print-content {
  position: relative;
}

.screen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.screen-actions {
  display: flex;
  gap: 1rem;
}

.print-page {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 210mm;
  margin: 0 auto;
}

/* 印刷画面でのロゴサイズ調整 */
.print-logo {
  height: 32px !important;
  width: auto !important;
}

/* チェックボックス表示の確認用スタイル */
.print-check-box {
  width: 18px;
  height: 18px;
  border: 2px solid #000;
  margin-right: 10px;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.print-check-box.checked {
  background-color: #000 !important;
  border-color: #000 !important;
}

.print-check-box.checked::after {
  content: "✓";
  color: white !important;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
}

/* 印刷時のスタイル */
@media print {
  .print-sheet {
    margin: 0 !important;
    padding: 0 !important;
    min-height: 0 !important;
    height: auto !important;
  }
  
  .print-content {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .print-page {
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    max-width: none !important;
    width: auto !important;
    height: auto !important;
  }
}

@media (max-width: 640px) {
  .screen-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .screen-actions {
    flex-direction: column;
  }
}

/* iOS専用の調整 */
@supports (-webkit-touch-callout: none) {
  .print-sheet {
    transform: scale(0.7);
    transform-origin: top left;
    width: 140%;
  }
  
  .print-signatures {
    flex-direction: column;
    gap: 5mm;
    align-items: center;
  }
  
  .print-signature-box {
    width: 100%;
    max-width: 60mm;
  }
  
  .print-signature-image {
    width: 50mm;
    max-height: 25mm;
  }
  
  .print-logo {
    height: 28px !important;
  }
}

/* 印刷時は元のサイズに戻す */
@media print {
  .print-sheet {
    transform: none !important;
    width: auto !important;
  }
  
  /* 印刷時は署名を横並びに戻す */
  .print-signatures {
    flex-direction: row !important;
    justify-content: center !important;
    gap: 10mm !important;
  }
  
  .print-signature-box {
    width: auto !important;
    max-width: 50mm !important;
  }
  
  .print-signature-image {
    width: 40mm !important;
    max-height: 30mm !important;
  }
}
</style>


```

```vue
<template>
  <div class="print-sheet">
    <div v-if="loading" class="loading-message no-print">
      読み込み中...
    </div>
    
    <div v-else-if="error" class="error-message no-print">
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="goBack">戻る</button>
    </div>
    
    <div v-else class="print-content">
      <!-- 画面表示用ヘッダー（印刷時は非表示） -->
      <div class="screen-header no-print">
        <h2>印刷プレビュー</h2>
        <div class="screen-actions">
          <button class="btn btn-primary" @click="handlePrint">印刷</button>
          <button class="btn btn-secondary" @click="goBack">戻る</button>
        </div>
      </div>
      
      <!-- 印刷用ページ -->
      <div class="print-page">
        <!-- ヘッダー -->
        <div class="print-header">
          <div class="print-header-left">
            <img
              ref="logoRef"
              src="@/assets/logo.svg"
              :alt="companyName"
              class="print-logo"
              @load="onImageLoad"
              @error="onImageError"
            />
            <div class="print-company-name">{{ companyName }}</div>
          </div>
          <div class="print-header-right">
            <div>実行ID: {{ execution.id }}</div>
            <div>日付: {{ formatDate(execution.timestamp) }}</div>
          </div>
        </div>
        
        <!-- タイトル -->
        <h1 class="print-title">{{ execution.templateName }}</h1>
        
        <!-- 基本情報 -->
        <div class="print-meta">
          <div class="print-meta-row">
            <div class="print-meta-label">作業者:</div>
            <div class="print-meta-value">{{ execution.operatorName }}</div>
          </div>
          <div class="print-meta-row">
            <div class="print-meta-label">確認者:</div>
            <div class="print-meta-value">{{ execution.checkerName }}</div>
          </div>
        </div>
        
        <!-- チェックリスト -->
        <div class="print-checklist">
          <div
            v-for="item in checklistItems"
            :key="item.id"
            class="print-checklist-item"
          >
            <div
              class="print-check-box"
              :class="{ checked: execution.checklist[item.id]?.checked === true }"
              :title="`Debug: ${execution.checklist[item.id]?.checked}`"
            ></div>
            <div class="print-item-content">
              <div class="print-item-label">{{ item.label }}</div>
              <div
                v-if="item.hasRemark && execution.checklist[item.id]?.remark"
                class="print-item-remark"
              >
                備考: {{ execution.checklist[item.id].remark }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 署名 -->
        <div class="print-signatures">
          <div class="print-signature-box">
            <div class="print-signature-label">作業者署名</div>
            <div class="print-signature-name">{{ execution.operatorName }}</div>
            <img
              v-if="operatorSignature"
              ref="operatorSigRef"
              :src="operatorSignature"
              alt="作業者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
          <div class="print-signature-box">
            <div class="print-signature-label">確認者署名</div>
            <div class="print-signature-name">{{ execution.checkerName }}</div>
            <img
              v-if="checkerSignature"
              ref="checkerSigRef"
              :src="checkerSignature"
              alt="確認者署名"
              class="print-signature-image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getExecution, getBlob } from '@/stores/db'
import checklistTemplate from '@/assets/checklist.template.json'
import { COMPANY_NAME } from '@/config/constants'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref(null)
const execution = ref(null)
const operatorSignature = ref(null)
const checkerSignature = ref(null)
const checklistItems = ref(checklistTemplate.items)

// 会社名を取得
const companyName = COMPANY_NAME

const logoRef = ref(null)
const operatorSigRef = ref(null)
const checkerSigRef = ref(null)

let imagesLoaded = 0
const totalImages = 3 // ロゴ + 2つの署名

// 画像読み込み完了
const onImageLoad = () => {
  imagesLoaded++
}

// 画像読み込みエラー
const onImageError = () => {
  console.warn('画像の読み込みに失敗しました')
  imagesLoaded++
}

// データ読み込み
const loadData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id
    
    // 実行データを取得
    execution.value = await getExecution(id)
    if (!execution.value) {
      throw new Error('指定された履歴が見つかりません')
    }
    
    // デバッグ: チェックリストデータを確認
    console.log('実行データ:', execution.value)
    console.log('チェックリストデータ:', execution.value.checklist)
    if (execution.value.checklist) {
      Object.keys(execution.value.checklist).forEach(key => {
        console.log(`項目 ${key}:`, execution.value.checklist[key])
      })
    }
    
    // 署名画像を取得
    operatorSignature.value = await getBlob(`${id}_operator_signature`)
    checkerSignature.value = await getBlob(`${id}_checker_signature`)
    
    // PDFファイル名用にドキュメントタイトルを設定
    const date = new Date(execution.value.timestamp)
    const formattedDate = date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '')
    const formattedTime = date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/:/g, '')
    document.title = `作業確認_${formattedDate}_${formattedTime}_${execution.value.id}`
    
  } catch (err) {
    console.error('データ読み込みエラー:', err)
    error.value = err.message || 'データの読み込みに失敗しました'
  } finally {
    loading.value = false
  }
}

// 日付フォーマット
const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 印刷
const handlePrint = () => {
  // 画像の読み込みを待つ
  const checkImagesLoaded = setInterval(() => {
    if (imagesLoaded >= totalImages) {
      clearInterval(checkImagesLoaded)
      window.print()
    }
  }, 100)
  
  // タイムアウト（5秒）
  setTimeout(() => {
    clearInterval(checkImagesLoaded)
    if (imagesLoaded < totalImages) {
      console.warn('一部の画像が読み込まれていませんが、印刷を続行します')
      window.print()
    }
  }, 5000)
}

// 戻る
const goBack = () => {
  router.back()
}

// 印刷ダイアログが閉じられた時の処理
const handleAfterPrint = () => {
  console.log('印刷ダイアログが閉じられました。前の画面に戻ります。')
  // 前の画面に戻る（チェック画面 or 履歴画面）
  router.back()
}

onMounted(() => {
  loadData()
  
  // 印刷後のイベントリスナーを追加
  window.addEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを登録しました')
})

onUnmounted(() => {
  // クリーンアップ
  window.removeEventListener('afterprint', handleAfterPrint)
  console.log('印刷後のイベントリスナーを削除しました')
})
</script>

<style scoped>
.print-sheet {
  min-height: 100vh;
  transform: scale(0.8);
  transform-origin: top left;
  width: 125%;
}

.loading-message,
.error-message {
  text-align: center;
  padding: 3rem;
}

.error-message {
  color: #ef4444;
}

.print-content {
  position: relative;
}

.screen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.screen-actions {
  display: flex;
  gap: 1rem;
}

.print-page {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 210mm;
  margin: 0 auto;
}

/* 印刷画面でのロゴサイズ調整 */
.print-logo {
  height: 32px !important;
  width: auto !important;
}

/* チェックボックス表示の確認用スタイル */
.print-check-box {
  width: 18px;
  height: 18px;
  border: 2px solid #000;
  margin-right: 10px;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.print-check-box.checked {
  background-color: #000 !important;
  border-color: #000 !important;
}

.print-check-box.checked::after {
  content: "✓";
  color: white !important;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
}

/* 印刷時のスタイル */
@media print {
  .print-sheet {
    margin: 0 !important;
    padding: 0 !important;
    min-height: 0 !important;
    height: auto !important;
  }
  
  .print-content {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .print-page {
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    max-width: none !important;
    width: auto !important;
    height: auto !important;
  }
}

@media (max-width: 640px) {
  .screen-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .screen-actions {
    flex-direction: column;
  }
}

/* iOS専用の調整 */
@supports (-webkit-touch-callout: none) {
  .print-sheet {
    transform: scale(0.7);
    transform-origin: top left;
    width: 140%;
  }
  
  .print-signatures {
    flex-direction: column;
    gap: 5mm;
    align-items: center;
  }
  
  .print-signature-box {
    width: 100%;
    max-width: 60mm;
  }
  
  .print-signature-image {
    width: 50mm;
    max-height: 25mm;
  }
  
  .print-logo {
    height: 28px !important;
  }
}

/* 印刷時は元のサイズに戻す */
@media print {
  .print-sheet {
    transform: none !important;
    width: auto !important;
  }
  
  /* 印刷時は署名を横並びに戻す */
  .print-signatures {
    flex-direction: row !important;
    justify-content: center !important;
    gap: 10mm !important;
  }
  
  .print-signature-box {
    width: auto !important;
    max-width: 50mm !important;
  }
  
  .print-signature-image {
    width: 40mm !important;
    max-height: 30mm !important;
  }
}
</style>


```

アプリ情報の会社名とアイコンを更新します。


```vue
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
          <span class="info-value">B&MTS</span>
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


```

```vue
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


```

```vue
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


```

アイコンを「Sample」表示に変更。SVGファイルを確認中。


```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#2563eb"/>
  <text x="256" y="320" font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="white" text-anchor="middle">S</text>
</svg>

```

distフォルダ内のアイコンも更新中。


```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#2563eb"/>
  <text x="256" y="320" font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="white" text-anchor="middle">S</text>
</svg>

```

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50">
  <text x="10" y="35" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#2563eb">Sample</text>
</svg>

```

アイコンデザインを調整します（「Sample」表示からシンプルな「S」ロゴに変更済み）。


README等、ドキュメント内の「B&M」表記は変更しません。変更内容を確認して完了です。


変更完了。

## 変更内容のまとめ

### 1. **定数ファイルの作成**
   - `src/config/constants.js` を新規作成
   - 社名: `COMPANY_NAME = '株式会社 サンプル'`
   - 社名（短縮）: `COMPANY_SHORT_NAME = 'SAMPLE'`
   - 実行IDプレフィックス: `RUN_ID_PREFIX = 'SMP'`

### 2. **各ファイルの更新**
   - `src/composables/useRunId.js`: 実行IDプレフィックスをBM→SMPに変更
   - `src/App.vue`: 定数を使用するように変更
   - `src/views/PrintSheet.vue`: 定数を使用
   - `src/views/Settings.vue`: 会社名をB&MTS→SAMPLEに変更
   - `index.html` と `public/manifest.webmanifest`: 会社名を含まないタイトルに変更

### 3. **アイコンの変更**
   - `public/icons/icon.svg`: 青背景に白い「S」のロゴ
   - `src/assets/logo.svg`: 青文字で「Sample」テキストロゴ
   - `dist/icons/icon.svg`: 同上

### 4. **実行IDの変更**
   - `BM-YYYYMMDD-NNN` → `SMP-YYYYMMDD-NNN`

全ファイルで社名と実行IDプレフィックスを定数化。以降は `src/config/constants.js` を編集するだけです。

---

**User**

教えてほしいのだが、
Githubにリポジトリを作成した。
そこに、このプロジェクトをデプロイしたいので、方法を教えてほしい

---

**Cursor**

GitHubにプロジェクトをデプロイする方法を説明します。まず、現在のプロジェクト構成を確認して、最適なデプロイ方法を提案します。


GitHubにプロジェクトをデプロイする方法をいくつか提案します。このプロジェクトはVue3 + Vite + PWAなので、以下の方法が適しています：

## 🚀 GitHubデプロイ方法

### 1. **GitHub Pages（推奨）**
最も簡単で無料の方法です。

#### 手順：
1. **GitHubリポジトリにプッシュ**
```bash
# プロジェクトディレクトリで実行
git init
git add .
git commit -m "Initial commit: WorkCheck PWA"
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
git push -u origin main
```

2. **GitHub Pages設定**
   - GitHubリポジトリの「Settings」→「Pages」
   - Source: 「GitHub Actions」を選択

3. **GitHub Actionsワークフローファイル作成**
`.github/workflows/deploy.yml` を作成：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 2. **Vercel（推奨）**
Vueアプリに最適化されたデプロイプラットフォーム。

#### 手順：
1. [Vercel](https://vercel.com)にアカウント作成
2. GitHubリポジトリを連携
3. 自動デプロイ設定：
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. **Netlify**
簡単なドラッグ&ドロップデプロイ。

#### 手順：
1. [Netlify](https://netlify.com)にアカウント作成
2. 「New site from Git」を選択
3. GitHubリポジトリを連携
4. ビルド設定：
   - Build command: `npm run build`
   - Publish directory: `dist`

### 4. **Firebase Hosting**
Googleのホスティングサービス。

#### 手順：
```bash
# Firebase CLIインストール
npm install -g firebase-tools

# Firebaseプロジェクト初期化
firebase init hosting

# ビルド&デプロイ
npm run build
firebase deploy
```

## 📝 デプロイ前の準備

### 1. **環境変数の設定**
`vite.config.js`でbase pathを設定：
```javascript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/リポジトリ名/' : '/',
  // ... 既存の設定
})
```

### 2. **.gitignoreの確認**
以下のファイルが除外されているか確認：
```
node_modules/
dist/
.env
.DS_Store
```

### 3. **README.mdの更新**
デプロイURLを追加：
```markdown
## 🌐 デプロイ
- **本番環境**: https://あなたのユーザー名.github.io/リポジトリ名/
- **開発環境**: `npm run dev`
```

## 🎯 推奨デプロイ方法

**GitHub Pages + GitHub Actions** が最も適しています：

✅ **メリット**：
- 無料
- GitHubと完全統合
- 自動デプロイ
- カスタムドメイン対応
- HTTPS自動対応

✅ **PWA対応**：
- Service Workerが正常動作
- オフライン機能が利用可能
- ホーム画面追加可能

どの方法を選択されますか？具体的な設定手順を詳しく説明します。

```shellscript
# プロジェクトディレクトリで実行
git init
git add .
git commit -m "Initial commit: WorkCheck PWA"
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
git push -u origin main
```

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

```shellscript
# Firebase CLIインストール
npm install -g firebase-tools

# Firebaseプロジェクト初期化
firebase init hosting

# ビルド&デプロイ
npm run build
firebase deploy
```

```javascript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/リポジトリ名/' : '/',
  // ... 既存の設定
})
```

```plaintext
node_modules/
dist/
.env
.DS_Store
```

```markdown
## 🌐 デプロイ
- **本番環境**: https://あなたのユーザー名.github.io/リポジトリ名/
- **開発環境**: `npm run dev`
```

---

**User**

あと、ビルドの仕方はReadMe.mdに書いていましたか？

---

**Cursor**

README.mdのビルド手順を確認します。


はい、README.mdにビルド手順が記載されています！

## 📋 README.mdに記載されているビルド手順

### 🛠️ セットアップ（116-147行目）

**1. インストール**
```bash
npm install
```

**2. 開発サーバーの起動**
```bash
npm run dev
```
- 開発サーバーが起動し、ブラウザで `http://localhost:5173` にアクセス可能
- ⚠️ **注意**: Service Workerは開発モードでは動作しません。オフライン機能をテストするには本番ビルドが必要

**3. ビルド**
```bash
npm run build
```
- 本番用のビルドが `dist/` ディレクトリに生成されます

**4. プレビュー**
```bash
npm run preview
```
- ビルドしたアプリケーションをローカルでプレビュー可能

### 📦 ビルド出力について

README.mdによると、ビルド後は以下のファイルが `dist/` ディレクトリに生成されます：

- `sw.js` - Workbox生成のService Worker
- `workbox-xxx.js` - Workboxランタイム
- `registerSW.js` - Service Worker登録スクリプト
- その他の静的ファイル（HTML, CSS, JS, アイコンなど）

### 🚀 デプロイとの連携

README.mdには以下のデプロイ方法も記載されています：

**IIS自動デプロイ**
```bash
.\deploy-to-iis.ps1
```

**Apache自動デプロイ**
```bash
./deploy-to-apache.sh
```

これらのスクリプトは以下を自動実行します：
- アプリケーションのビルド
- ファイルのコピー（**Service Worker含む**）
- サーバー設定

つまり、README.mdには**完全なビルド手順**が記載されており、GitHubデプロイの際も `npm run build` コマンドを使用すれば問題ありません！

```shellscript
npm install
```

```shellscript
npm run dev
```

```shellscript
npm run build
```

```shellscript
npm run preview
```

```shellscript
.\deploy-to-iis.ps1
```

```shellscript
./deploy-to-apache.sh
```

---

**User**

[GitHubリポジトリにプッシュ]
これは、コマンドプロンプトで実行しますか？

---

**Cursor**

はい、GitHubリポジトリにプッシュするコマンドは**コマンドプロンプト**または**PowerShell**で実行します。

## 💻 実行環境の選択

### 1. **コマンドプロンプト（cmd）**
- Windows標準のコマンドライン
- `Win + R` → `cmd` → Enter

### 2. **PowerShell（推奨）**
- Windows 10/11の標準
- `Win + X` → `Windows PowerShell` または `Windows Terminal`
- より高機能で使いやすい

### 3. **Git Bash**
- Git for Windowsに付属
- Linux風のコマンドが使える

## 🚀 実際の手順

### 前提条件
1. **Gitがインストール済み**であること
2. **GitHubアカウント**があること
3. **GitHubリポジトリ**が作成済みであること

### 実行コマンド（PowerShell/コマンドプロンプト共通）

```bash
# 1. プロジェクトディレクトリに移動
cd C:\!Project\!Apps\WorkCheckPWAOffline

# 2. Gitリポジトリを初期化
git init

# 3. ファイルをステージング
git add .

# 4. 初回コミット
git commit -m "Initial commit: WorkCheck PWA"

# 5. メインブランチに設定
git branch -M main

# 6. GitHubリポジトリをリモートに追加
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git

# 7. GitHubにプッシュ
git push -u origin main
```

## 🔐 認証について

初回プッシュ時に認証が求められます：

### **Personal Access Token（推奨）**
1. GitHub → Settings → Developer settings → Personal access tokens
2. 「Generate new token」→ 「repo」権限を選択
3. 生成されたトークンをパスワードとして使用

### **GitHub CLI（簡単）**
```bash
# GitHub CLIをインストール後
gh auth login
gh repo create リポジトリ名 --public
git push -u origin main
```

## ⚠️ 注意点

1. **リポジトリ名**を実際のものに置き換える
2. **ユーザー名**を実際のものに置き換える
3. **認証情報**を事前に準備する
4. **インターネット接続**が必要

どの方法で実行されますか？具体的な手順を詳しく説明します。

```shellscript
# 1. プロジェクトディレクトリに移動
cd C:\!Project\!Apps\WorkCheckPWAOffline

# 2. Gitリポジトリを初期化
git init

# 3. ファイルをステージング
git add .

# 4. 初回コミット
git commit -m "Initial commit: WorkCheck PWA"

# 5. メインブランチに設定
git branch -M main

# 6. GitHubリポジトリをリモートに追加
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git

# 7. GitHubにプッシュ
git push -u origin main
```

```shellscript
# GitHub CLIをインストール後
gh auth login
gh repo create リポジトリ名 --public
git push -u origin main
```

---

**User**

distフォルダをアップロードしてもよいのか？

---

**Cursor**

**distフォルダはアップロードしない方が良い**です。理由を説明します。


## ❌ distフォルダをアップロードしない理由

### 1. **.gitignoreで除外されている**
`.gitignore`の17行目に`dist`が記載されており、**意図的に除外**されています。

### 2. **ビルド成果物は自動生成される**
- `dist`フォルダは`npm run build`で**自動生成**される
- ソースコードが変更されると、ビルド結果も変わる
- 手動でアップロードする必要がない

### 3. **リポジトリサイズの肥大化**
- `dist`フォルダには圧縮・最適化されたファイルが大量に含まれる
- ソースコードの変更のたびにビルド結果も更新される
- リポジトリが不要に大きくなる

### 4. **GitHub Actionsで自動ビルド**
GitHub PagesやVercelなどのデプロイサービスは：
- ソースコードを取得
- 自動で`npm run build`を実行
- `dist`フォルダを生成
- デプロイ

## ✅ 正しいアップロード方法

### アップロードすべきファイル
```bash
git add .
# これで以下がアップロードされます：
# - src/ (ソースコード)
# - public/ (静的ファイル)
# - package.json (依存関係)
# - vite.config.js (ビルド設定)
# - README.md (ドキュメント)
# - その他の設定ファイル
```

### アップロードされないファイル（.gitignoreで除外）
- `dist/` (ビルド成果物)
- `node_modules/` (依存関係)
- `.env` (環境変数)
- ログファイル

## 🚀 デプロイの流れ

1. **ソースコードのみをGitHubにプッシュ**
2. **GitHub Actions/Vercel/Netlifyが自動でビルド**
3. **ビルド結果を自動でデプロイ**

つまり、**distフォルダはアップロードせず**、ソースコードのみをプッシュして、デプロイサービスに自動ビルドを任せるのが正しい方法です！

```shellscript
git add .
# これで以下がアップロードされます：
# - src/ (ソースコード)
# - public/ (静的ファイル)
# - package.json (依存関係)
# - vite.config.js (ビルド設定)
# - README.md (ドキュメント)
# - その他の設定ファイル
```

