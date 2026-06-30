import { getChromeStorage, setChromeStorage } from './dataHelpers.js'

const STORAGE_KEY = 'savedApiMarks'

export function recordFingerprint(method, url) {
  try {
    const u = new URL(url)
    return `${(method || 'GET').toUpperCase()} ${u.pathname}${u.search || ''}`
  } catch {
    return `${method || 'GET'} ${url || ''}`
  }
}

export async function loadSavedMarks() {
  const res = await getChromeStorage(STORAGE_KEY)
  const raw = res[STORAGE_KEY] || {}
  return {
    requestIds: raw.requestIds || {},
    fingerprints: raw.fingerprints || {}
  }
}

export async function markRecordsSaved(records, productId, apiIds = []) {
  const marks = await loadSavedMarks()
  const now = Date.now()
  for (let i = 0; i < (records || []).length; i++) {
    const r = records[i]
    const apiId = apiIds[i] || apiIds[0] || 0
    const meta = { productId, at: now }
    if (apiId > 0) meta.apiId = apiId
    if (r.requestId) {
      marks.requestIds[r.requestId] = meta
    }
    const fp = recordFingerprint(r.method, r.url)
    marks.fingerprints[fp] = meta
  }
  await setChromeStorage({ [STORAGE_KEY]: marks })
}

export function getRecordApiId(record, marks) {
  if (!record || !marks) return 0
  if (record.requestId && marks.requestIds[record.requestId]?.apiId) {
    return marks.requestIds[record.requestId].apiId
  }
  const fp = recordFingerprint(record.method, record.url)
  return marks.fingerprints[fp]?.apiId || 0
}

export function isRecordSaved(record, marks) {
  if (!record || !marks) return false
  if (record.requestId && marks.requestIds[record.requestId]) return true
  const fp = recordFingerprint(record.method, record.url)
  return !!marks.fingerprints[fp]
}
