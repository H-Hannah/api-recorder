import { ElNotification } from 'element-plus'

/** AI 入库 / 保存到平台结果 */
export function notifyIngestResult(result, mode) {
  if (result?.scenario) {
    const sc = result.scenario
    ElNotification({
      title: '场景已保存',
      message: `${sc.name || '场景'} · ${sc.step_count || 0} 步`,
      type: 'success',
      duration: 5000,
      position: 'top-right'
    })
    return
  }
  const apis = result?.apis || []
  if (!apis.length) {
    ElNotification({
      title: '入库完成',
      message: '请打开 Web 管理端查看详情',
      type: 'warning',
      duration: 4000,
      position: 'top-right'
    })
    return
  }
  const preview = apis
    .slice(0, 3)
    .map((a) => a.name || `#${a.id}`)
    .join('、')
  const suffix = apis.length > 3 ? ` 等共 ${apis.length} 个` : ` · 共 ${apis.length} 个`
  ElNotification({
    title: mode === 'scenario' ? '场景已保存' : '接口已入库',
    message: preview + suffix,
    type: 'success',
    duration: 5500,
    position: 'top-right'
  })
}
