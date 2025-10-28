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

