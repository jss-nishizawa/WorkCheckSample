<template>
  <div class="home-view">
    <h2 class="page-title">作業確認チェック</h2>
    
    <!-- 基本情報入力 -->
    <div class="card">
      <h3 class="card-title">基本情報</h3>
      
      <div class="form-group">
        <label for="operatorName" class="form-label required">作業者名</label>
        <input
          id="operatorName"
          type="text"
          class="form-input"
          v-model="formData.operatorName"
          placeholder="山田 太郎"
        />
      </div>
      
      <div class="form-group">
        <label for="checkerName" class="form-label required">確認者名</label>
        <input
          id="checkerName"
          type="text"
          class="form-input"
          v-model="formData.checkerName"
          placeholder="佐藤 花子"
        />
      </div>
    </div>
    
    <!-- チェックリスト -->
    <div class="card">
      <h3 class="card-title">チェック項目</h3>
      <ChecklistForm v-model="formData.checklist" :items="checklistItems" />
    </div>
    
    <!-- 署名 -->
    <div class="card">
      <h3 class="card-title">署名</h3>
      
      <div class="signature-section">
        <div class="signature-item">
          <label class="form-label required">作業者署名</label>
          <button
            class="btn btn-outline signature-btn"
            @click="openSignatureModal('operator')"
          >
            {{ formData.operatorSignature ? '署名を変更' : '署名する' }}
          </button>
          <div v-if="formData.operatorSignature" class="signature-preview">
            <img :src="formData.operatorSignature" alt="作業者署名" />
          </div>
        </div>
        
        <div class="signature-item">
          <label class="form-label required">確認者署名</label>
          <button
            class="btn btn-outline signature-btn"
            @click="openSignatureModal('checker')"
          >
            {{ formData.checkerSignature ? '署名を変更' : '署名する' }}
          </button>
          <div v-if="formData.checkerSignature" class="signature-preview">
            <img :src="formData.checkerSignature" alt="確認者署名" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- 印刷ボタン -->
    <div class="action-buttons">
      <button
        class="btn btn-primary btn-large"
        @click="handlePrint"
        :disabled="!isFormValid || isSaving"
      >
        {{ isSaving ? '処理中...' : 'PDF生成（印刷）' }}
      </button>
    </div>
    
    <!-- 署名モーダル -->
    <SignatureModal
      :is-open="signatureModal.isOpen"
      :title="signatureModal.title"
      @close="closeSignatureModal"
      @save="saveSignature"
    />
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ChecklistForm from '@/components/ChecklistForm.vue'
import SignatureModal from '@/components/SignatureModal.vue'
import checklistTemplate from '@/assets/checklist.template.json'
import { generateRunId } from '@/composables/useRunId'
import { saveExecution, saveBlob } from '@/stores/db'

const router = useRouter()

const checklistItems = ref(checklistTemplate.items)

const formData = ref({
  operatorName: '',
  checkerName: '',
  checklist: {},
  operatorSignature: null,
  checkerSignature: null
})

const signatureModal = ref({
  isOpen: false,
  title: '',
  type: '' // 'operator' or 'checker'
})

const isSaving = ref(false)

// フォームバリデーション
const isFormValid = computed(() => {
  return (
    formData.value.operatorName.trim() !== '' &&
    formData.value.checkerName.trim() !== '' &&
    formData.value.operatorSignature !== null &&
    formData.value.checkerSignature !== null
  )
})

// 署名モーダルを開く
const openSignatureModal = (type) => {
  signatureModal.value.type = type
  signatureModal.value.title = type === 'operator' ? '作業者署名' : '確認者署名'
  signatureModal.value.isOpen = true
}

// 署名モーダルを閉じる
const closeSignatureModal = () => {
  signatureModal.value.isOpen = false
}

// 署名を保存
const saveSignature = (dataUrl) => {
  if (signatureModal.value.type === 'operator') {
    formData.value.operatorSignature = dataUrl
  } else {
    formData.value.checkerSignature = dataUrl
  }
}

// 印刷（PDF生成）
const handlePrint = async () => {
  if (!isFormValid.value || isSaving.value) return
  
  try {
    isSaving.value = true
    
    console.log('印刷処理開始...')
    
    // 実行IDを生成
    console.log('実行ID生成中...')
    const runId = await generateRunId()
    console.log('実行ID:', runId)
    
    const timestamp = new Date().toISOString()
    const date = new Date().toLocaleDateString('ja-JP')
    
    // 実行データを保存（Vueのリアクティブオブジェクトをプレーンオブジェクトに変換）
    const executionData = {
      id: runId,
      timestamp,
      date,
      templateName: checklistTemplate.templateName,
      operatorName: formData.value.operatorName,
      checkerName: formData.value.checkerName,
      checklist: JSON.parse(JSON.stringify(formData.value.checklist)) // ディープコピーでプレーンオブジェクト化
    }
    
    console.log('実行データ保存中...', executionData)
    console.log('チェックリストデータ（保存前）:', formData.value.checklist)
    console.log('チェックリストデータ（保存時）:', executionData.checklist)
    await saveExecution(executionData)
    console.log('実行データ保存完了')
    
    // 署名画像を保存
    console.log('署名画像保存中...')
    if (formData.value.operatorSignature) {
      await saveBlob(`${runId}_operator_signature`, formData.value.operatorSignature)
      console.log('作業者署名保存完了')
    } else {
      console.warn('作業者署名が空です')
    }
    
    if (formData.value.checkerSignature) {
      await saveBlob(`${runId}_checker_signature`, formData.value.checkerSignature)
      console.log('確認者署名保存完了')
    } else {
      console.warn('確認者署名が空です')
    }
    
    // 印刷ページへ遷移（自動印刷なし）
    console.log('印刷ページへ遷移中...')
    await router.push(`/print/${runId}`)
    
  } catch (error) {
    console.error('保存エラー詳細:', error)
    console.error('エラースタック:', error.stack)
    alert(`データの保存に失敗しました。\n\nエラー: ${error.message}\n\nブラウザのコンソールを確認してください。`)
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  // 初期化処理（必要に応じて）
})
</script>

<style scoped>
.home-view {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.signature-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.signature-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.signature-btn {
  align-self: flex-start;
}

.signature-preview {
  margin-top: 0.5rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  max-width: 300px;
}

.signature-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.action-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

@media (max-width: 640px) {
  .signature-preview {
    max-width: 100%;
  }
  
  .signature-btn {
    width: 100%;
  }
}
</style>

