import { getNextRunNumber, getCompanyConfig, getTemplate, getTemplateByTemplateId } from '@/stores/db'
import { RUN_ID_PREFIX } from '@/config/constants'

/**
 * 実行ID生成（PREFIX-TEMPLATEID-YYYYMMDD-NNN形式）
 * @param {string} templateId - テンプレートID（UUIDまたはtemplateId）
 * @returns {Promise<string>} 実行ID
 */
export async function generateRunId(templateId) {
  try {
    // 会社設定からプレフィックスを取得
    const companyConfig = await getCompanyConfig()
    const prefix = companyConfig?.runIdPrefix || RUN_ID_PREFIX
    
    // テンプレートを取得してtemplateIdを取得
    let templateIdStr = templateId
    
    try {
      let template
      try {
        // UUIDで取得を試みる
        template = await getTemplate(templateId)
        if (template && template.templateId) {
          templateIdStr = template.templateId
        }
      } catch (e) {
        // templateIdで取得を試みる
        template = await getTemplateByTemplateId(templateId)
        if (template && template.templateId) {
          templateIdStr = template.templateId
        }
      }
      
      // テンプレートが見つからない場合、templateIdをそのまま使用（デフォルトテンプレートの場合）
      if (!template) {
        console.warn('テンプレートが見つかりません。templateIdをそのまま使用します:', templateId)
      }
    } catch (error) {
      // エラーが発生した場合も、templateIdをそのまま使用
      console.warn('テンプレート取得エラー。templateIdをそのまま使用します:', error.message)
    }
    
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const dateStr = `${year}${month}${day}`
    
    console.log('日付文字列:', dateStr)
    console.log('テンプレートID:', templateIdStr)
    
    // テンプレートIDごと、日付ごとの連番を取得
    const num = await getNextRunNumber(templateIdStr, dateStr)
    console.log('連番:', num)
    
    const numStr = String(num).padStart(3, '0')
    const runId = `${prefix}-${templateIdStr}-${dateStr}-${numStr}`
    
    console.log('生成された実行ID:', runId)
    return runId
  } catch (error) {
    console.error('実行ID生成エラー:', error)
    throw new Error(`実行IDの生成に失敗しました: ${error.message}`)
  }
}

/**
 * 実行IDから表示用の日付文字列を生成
 * @param {string} runId - 実行ID（PREFIX-TEMPLATEID-YYYYMMDD-NNN）
 * @returns {string} 日付文字列（YYYY-MM-DD）
 */
export function formatDateFromRunId(runId) {
  // PREFIX-TEMPLATEID-YYYYMMDD-NNN 形式
  // 例: SMP-STANDARD-20251029-001
  const match = runId.match(/[^-]+-[^-]+-(\d{4})(\d{2})(\d{2})-\d{3}/)
  if (!match) {
    // 旧形式の互換性（SMP-YYYYMMDD-NNN）
    const oldMatch = runId.match(/(\d{4})(\d{2})(\d{2})-\d{3}/)
    if (oldMatch) {
      return `${oldMatch[1]}-${oldMatch[2]}-${oldMatch[3]}`
    }
    return ''
  }
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

