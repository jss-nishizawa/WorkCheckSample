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

