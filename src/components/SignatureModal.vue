<template>
  <teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="handleCancel">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
        </div>
        
        <div class="modal-body">
          <p class="signature-instruction">
            下のキャンバスに署名を記入してください
          </p>
          
          <div class="signature-canvas-container">
            <canvas
              ref="canvasRef"
              class="signature-canvas"
              @mousedown="startDrawing"
              @mousemove="draw"
              @mouseup="stopDrawing"
              @mouseleave="stopDrawing"
              @touchstart.prevent="startDrawingTouch"
              @touchmove.prevent="drawTouch"
              @touchend.prevent="stopDrawing"
            ></canvas>
          </div>
          
          <div class="signature-actions">
            <button class="btn btn-secondary" @click="clearCanvas">クリア</button>
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
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '署名'
  }
})

const emit = defineEmits(['close', 'save'])

const canvasRef = ref(null)
const isDrawing = ref(false)
const hasDrawn = ref(false)
const errorMessage = ref('')

let ctx = null

// キャンバス初期化
const initCanvas = () => {
  if (!canvasRef.value) return
  
  const canvas = canvasRef.value
  const container = canvas.parentElement
  
  // 高解像度対応
  const dpr = window.devicePixelRatio || 1
  const rect = container.getBoundingClientRect()
  
  canvas.width = rect.width * dpr
  canvas.height = 300 * dpr
  canvas.style.width = `${rect.width}px`
  canvas.style.height = '300px'
  
  ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = 2
  ctx.strokeStyle = '#000000'
  
  // 背景を透明に
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// 描画開始（マウス）
const startDrawing = (e) => {
  isDrawing.value = true
  hasDrawn.value = true
  errorMessage.value = ''
  
  const rect = canvasRef.value.getBoundingClientRect()
  ctx.beginPath()
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
}

// 描画（マウス）
const draw = (e) => {
  if (!isDrawing.value) return
  
  const rect = canvasRef.value.getBoundingClientRect()
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
  ctx.stroke()
}

// 描画開始（タッチ）
const startDrawingTouch = (e) => {
  isDrawing.value = true
  hasDrawn.value = true
  errorMessage.value = ''
  
  const touch = e.touches[0]
  const rect = canvasRef.value.getBoundingClientRect()
  ctx.beginPath()
  ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top)
}

// 描画（タッチ）
const drawTouch = (e) => {
  if (!isDrawing.value) return
  
  const touch = e.touches[0]
  const rect = canvasRef.value.getBoundingClientRect()
  ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top)
  ctx.stroke()
}

// 描画停止
const stopDrawing = () => {
  isDrawing.value = false
}

// キャンバスクリア
const clearCanvas = () => {
  if (!canvasRef.value) return
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  hasDrawn.value = false
  errorMessage.value = ''
}

// 保存
const handleSave = () => {
  if (!hasDrawn.value) {
    errorMessage.value = '署名を記入してください'
    return
  }
  
  // PNG（透明背景）として出力
  const dataUrl = canvasRef.value.toDataURL('image/png')
  emit('save', dataUrl)
  emit('close')
}

// キャンセル
const handleCancel = () => {
  emit('close')
}

// モーダルが開いたときの処理
watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    await nextTick()
    initCanvas()
    hasDrawn.value = false
    errorMessage.value = ''
  }
})
</script>

<style scoped>
.signature-instruction {
  margin-bottom: 1rem;
  color: #6b7280;
}

.signature-canvas-container {
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  background: #ffffff;
  overflow: hidden;
  margin-bottom: 1rem;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 300px;
  cursor: crosshair;
  touch-action: none;
}

.signature-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.signature-actions .btn {
  padding: 0.5rem 1rem;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

/* モバイル対応でボタンの順序を調整（上に保存、下にキャンセル） */
@media (max-width: 640px) {
  .modal-footer {
    flex-direction: column !important;
    gap: 0.5rem !important;
    justify-content: flex-start !important;
  }
  
  .modal-footer .btn {
    width: 100% !important;
    margin: 0 !important;
  }
  
  .modal-footer .btn:first-child {
    order: 1;
  }
  
  .modal-footer .btn:last-child {
    order: 2;
  }
}
</style>

