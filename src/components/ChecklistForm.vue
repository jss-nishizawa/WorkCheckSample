<template>
  <div class="checklist-form">
    <div v-for="item in items" :key="item.id" class="checklist-item card">
      <div class="checkbox-group">
        <input
          type="checkbox"
          :id="item.id"
          class="checkbox-input"
          v-model="checkStates[item.id]"
          @change="emitUpdate"
        />
        <label :for="item.id" class="item-label">{{ item.label }}</label>
      </div>
      
      <div v-if="item.hasRemark" class="remark-group">
        <label :for="`${item.id}_remark`" class="form-label">備考（任意）</label>
        <textarea
          :id="`${item.id}_remark`"
          class="form-textarea"
          :maxlength="item.remarkMaxLength || 50"
          v-model="remarks[item.id]"
          @input="emitUpdate"
          placeholder="備考を入力..."
        ></textarea>
        <div class="char-count">
          {{ (remarks[item.id] || '').length }} / {{ item.remarkMaxLength || 50 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const checkStates = ref({})
const remarks = ref({})

// 初期化
const initializeStates = () => {
  if (!props.items || props.items.length === 0) {
    console.log('ChecklistForm: アイテムが空です')
    return
  }
  
  const newCheckStates = {}
  const newRemarks = {}
  
  console.log('ChecklistForm初期化:', props.modelValue)
  
  props.items.forEach(item => {
    newCheckStates[item.id] = props.modelValue[item.id]?.checked || false
    if (item.hasRemark) {
      newRemarks[item.id] = props.modelValue[item.id]?.remark || ''
    }
    console.log(`項目 ${item.id}:`, props.modelValue[item.id])
  })
  
  checkStates.value = newCheckStates
  remarks.value = newRemarks
  
  console.log('初期化後のcheckStates:', checkStates.value)
}

// 親コンポーネントへの更新通知
const emitUpdate = () => {
  const result = {}
  
  props.items.forEach(item => {
    result[item.id] = {
      checked: checkStates.value[item.id] || false,
      remark: item.hasRemark ? (remarks.value[item.id] || '') : undefined
    }
  })
  
  console.log('ChecklistForm emitUpdate:', result)
  emit('update:modelValue', result)
}

// 初期化
initializeStates()

// プロパティ変更時に再初期化
watch(() => props.items, initializeStates, { deep: true, immediate: true })
watch(() => props.modelValue, initializeStates, { deep: true, immediate: true })
</script>

<style scoped>
.checklist-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checklist-item {
  transition: box-shadow 0.2s;
}

.checklist-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.checkbox-group {
  margin-bottom: 0.75rem;
}

.item-label {
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  cursor: pointer;
}

.remark-group {
  margin-left: 1.75rem;
  margin-top: 0.5rem;
}

.char-count {
  text-align: right;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

@media (max-width: 640px) {
  .remark-group {
    margin-left: 0;
  }
}
</style>

