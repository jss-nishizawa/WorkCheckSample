<template>
  <teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="handleCancel">
      <div class="modal-content modal-large">
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
        </div>
        
        <div class="modal-body">
          <!-- 基本情報 -->
          <div class="form-section">
            <div class="form-group">
              <label for="templateName" class="form-label required">テンプレート名</label>
              <input
                id="templateName"
                type="text"
                class="form-input"
                v-model="templateData.name"
                placeholder="例: 標準作業確認チェックリスト"
              />
            </div>
            
            <div class="form-group">
              <label for="templateId" class="form-label required">テンプレートID</label>
              <input
                id="templateId"
                type="text"
                class="form-input"
                v-model="templateData.templateId"
                placeholder="例: STANDARD"
                @input="formatTemplateId"
              />
              <p class="form-hint">英数字とアンダースコア(_)のみ使用可能。自動的に大文字に変換されます。</p>
            </div>
            
            <div class="form-group">
              <label for="description" class="form-label">説明（任意）</label>
              <textarea
                id="description"
                class="form-textarea"
                v-model="templateData.description"
                placeholder="このテンプレートの説明を入力..."
                rows="2"
              ></textarea>
            </div>
          </div>
          
          <!-- チェック項目 -->
          <div class="form-section">
            <div class="section-header">
              <h3 class="section-title">チェック項目</h3>
              <button class="btn btn-primary btn-sm" @click="addItem">
                + 項目を追加
              </button>
            </div>
            
            <div v-if="templateData.items.length === 0" class="empty-state">
              <p>チェック項目がありません</p>
              <button class="btn btn-primary" @click="addItem">最初の項目を追加</button>
            </div>
            
            <div class="items-list">
              <div
                v-for="(item, index) in templateData.items"
                :key="item.id || index"
                class="item-card"
              >
                <div class="item-header">
                  <div class="item-number">{{ index + 1 }}</div>
                  <div class="item-actions">
                    <button
                      v-if="index > 0"
                      class="btn-icon btn-secondary"
                      @click="moveItemUp(index)"
                      title="上へ移動"
                    >
                      ↑
                    </button>
                    <button
                      v-if="index < templateData.items.length - 1"
                      class="btn-icon btn-secondary"
                      @click="moveItemDown(index)"
                      title="下へ移動"
                    >
                      ↓
                    </button>
                    <button
                      class="btn-icon btn-danger"
                      @click="removeItem(index)"
                      title="削除"
                    >
                      ×
                    </button>
                  </div>
                </div>
                
                <div class="item-body">
                  <div class="form-group">
                    <label :for="`item-label-${index}`" class="form-label required">項目ラベル</label>
                    <input
                      :id="`item-label-${index}`"
                      type="text"
                      class="form-input"
                      v-model="item.label"
                      placeholder="例: 作業前の安全確認を実施しましたか"
                    />
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">
                        <input
                          type="checkbox"
                          v-model="item.hasRemark"
                        />
                        備考欄を追加
                      </label>
                    </div>
                    
                    <div v-if="item.hasRemark" class="form-group">
                      <label :for="`item-remark-length-${index}`" class="form-label">最大文字数</label>
                      <input
                        :id="`item-remark-length-${index}`"
                        type="number"
                        class="form-input"
                        v-model.number="item.remarkMaxLength"
                        min="1"
                        max="500"
                        placeholder="50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-primary" @click="handleSave">保存</button>
          <button class="btn btn-secondary" @click="handleCancel">キャンセル</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'テンプレート編集'
  },
  template: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const templateData = ref({
  id: null,
  name: '',
  templateId: '',
  description: '',
  items: []
})

const errorMessage = ref('')

// テンプレートIDを大文字に変換
const formatTemplateId = (e) => {
  const value = e.target.value.replace(/[^A-Za-z0-9_]/g, '').toUpperCase()
  templateData.value.templateId = value
  e.target.value = value
}

// 項目を追加
const addItem = () => {
  const newItem = {
    id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    label: '',
    hasRemark: false,
    remarkMaxLength: 50
  }
  templateData.value.items.push(newItem)
}

// 項目を削除
const removeItem = (index) => {
  if (confirm('この項目を削除しますか？')) {
    templateData.value.items.splice(index, 1)
  }
}

// 項目を上へ移動
const moveItemUp = (index) => {
  if (index > 0) {
    const items = templateData.value.items
    const temp = items[index]
    items[index] = items[index - 1]
    items[index - 1] = temp
  }
}

// 項目を下へ移動
const moveItemDown = (index) => {
  if (index < templateData.value.items.length - 1) {
    const items = templateData.value.items
    const temp = items[index]
    items[index] = items[index + 1]
    items[index + 1] = temp
  }
}

// バリデーション
const validate = () => {
  errorMessage.value = ''
  
  if (!templateData.value.name.trim()) {
    errorMessage.value = 'テンプレート名を入力してください'
    return false
  }
  
  if (!templateData.value.templateId.trim()) {
    errorMessage.value = 'テンプレートIDを入力してください'
    return false
  }
  
  // テンプレートIDの形式チェック
  if (!/^[A-Z0-9_]+$/.test(templateData.value.templateId)) {
    errorMessage.value = 'テンプレートIDは英数字とアンダースコアのみ使用可能です'
    return false
  }
  
  if (templateData.value.items.length === 0) {
    errorMessage.value = '少なくとも1つのチェック項目が必要です'
    return false
  }
  
  // 各項目のバリデーション
  for (let i = 0; i < templateData.value.items.length; i++) {
    const item = templateData.value.items[i]
    if (!item.label.trim()) {
      errorMessage.value = `${i + 1}番目の項目のラベルを入力してください`
      return false
    }
    
    if (item.hasRemark && (!item.remarkMaxLength || item.remarkMaxLength < 1)) {
      item.remarkMaxLength = 50 // デフォルト値
    }
  }
  
  return true
}

// 保存
const handleSave = () => {
  if (!validate()) {
    return
  }
  
  const template = {
    ...templateData.value,
    version: '1.0'
  }
  
  emit('save', template)
  emit('close')
}

// キャンセル
const handleCancel = () => {
  emit('close')
}

// モーダルが開いたときの処理
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.template) {
      // 既存テンプレートを編集
      templateData.value = {
        id: props.template.id || null,
        name: props.template.name || '',
        templateId: props.template.templateId || '',
        description: props.template.description || '',
        items: JSON.parse(JSON.stringify(props.template.items || []))
      }
    } else {
      // 新規テンプレート
      templateData.value = {
        id: null,
        name: '',
        templateId: '',
        description: '',
        items: []
      }
    }
    errorMessage.value = ''
  }
})
</script>

<style scoped>
.modal-large {
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section:last-child {
  margin-bottom: 0;
}

.form-hint {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  color: #6b7280;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-card {
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s;
}

.item-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.item-number {
  font-weight: 600;
  color: #1f2937;
  font-size: 1.125rem;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.item-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: end;
}

.btn-icon {
  width: 2rem;
  height: 2rem;
  padding: 0;
  border-radius: 0.25rem;
  border: none;
  background: transparent;
  color: #ef4444;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #fee2e2;
}

.btn-secondary {
  color: #6b7280;
}

.btn-secondary:hover {
  background: #f3f4f6;
}

.btn-danger {
  color: #ef4444;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

@media (max-width: 640px) {
  .modal-large {
    max-width: 95vw;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-footer .btn {
    width: 100%;
  }
}
</style>

