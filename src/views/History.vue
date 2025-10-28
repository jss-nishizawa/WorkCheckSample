<template>
  <div class="history-view">
    <h2 class="page-title">履歴</h2>
    
    <div v-if="loading" class="loading-message">
      読み込み中...
    </div>
    
    <div v-else-if="executions.length === 0" class="empty-message card">
      <p>まだ履歴がありません。</p>
      <p>チェックタブから作業確認を実施してください。</p>
    </div>
    
    <div v-else class="history-list">
      <div
        v-for="execution in executions"
        :key="execution.id"
        class="history-item card"
      >
        <div class="history-header">
          <div class="history-info">
            <h3 class="history-title">{{ execution.id }}</h3>
            <p class="history-date">{{ formatDate(execution.timestamp) }}</p>
            <p class="history-template">{{ execution.templateName }}</p>
          </div>
          <div class="history-actions">
            <button
              class="btn btn-secondary btn-sm"
              @click="handleReprint(execution.id)"
              title="再印刷"
            >
              📄 再印刷
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="handleDelete(execution.id)"
              title="削除"
            >
              🗑️ 削除
            </button>
          </div>
        </div>
        
        <div class="history-details">
          <div class="detail-row">
            <span class="detail-label">作業者:</span>
            <span class="detail-value">{{ execution.operatorName }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">確認者:</span>
            <span class="detail-value">{{ execution.checkerName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getExecutions, deleteExecution } from '@/stores/db'

const router = useRouter()

const executions = ref([])
const loading = ref(true)

// 履歴を読み込む
const loadExecutions = async () => {
  loading.value = true
  try {
    executions.value = await getExecutions(20)
  } catch (error) {
    console.error('履歴の読み込みエラー:', error)
    alert('履歴の読み込みに失敗しました。')
  } finally {
    loading.value = false
  }
}

// 日時フォーマット
const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 再印刷
const handleReprint = async (id) => {
  try {
    await router.push(`/print/${id}`)
  } catch (error) {
    console.error('再印刷エラー:', error)
    alert('印刷ページの表示に失敗しました。')
  }
}

// 削除
const handleDelete = async (id) => {
  if (!confirm('この履歴を削除しますか？\nこの操作は取り消せません。')) {
    return
  }
  
  try {
    await deleteExecution(id)
    await loadExecutions()
    alert('削除しました。')
  } catch (error) {
    console.error('削除エラー:', error)
    alert('削除に失敗しました。')
  }
}

onMounted(() => {
  loadExecutions()
})
</script>

<style scoped>
.history-view {
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.loading-message {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.empty-message {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  transition: box-shadow 0.2s;
}

.history-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.history-info {
  flex: 1;
}

.history-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #2563eb;
}

.history-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.25rem 0;
}

.history-template {
  font-size: 0.875rem;
  color: #374151;
  margin: 0;
}

.history-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.history-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  gap: 0.5rem;
}

.detail-label {
  font-weight: 500;
  color: #6b7280;
  min-width: 80px;
}

.detail-value {
  color: #1f2937;
}

@media (max-width: 640px) {
  .history-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .history-actions {
    width: 100%;
  }
  
  .history-actions .btn {
    flex: 1;
  }
}
</style>

