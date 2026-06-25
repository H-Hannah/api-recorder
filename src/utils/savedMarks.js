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

export async function markRecordsSaved(records, productId) {
  const marks = await loadSavedMarks()
  const now = Date.now()
  for (const r of records || []) {
    if (r.requestId) {
      marks.requestIds[r.requestId] = { productId, at: now }
    }
    const fp = recordFingerprint(r.method, r.url)
    marks.fingerprints[fp] = { productId, at: now }
  }
  await setChromeStorage({ [STORAGE_KEY]: marks })
}

export function isRecordSaved(record, marks) {
  if (!record || !marks) return false
  if (record.requestId && marks.requestIds[record.requestId]) return true
  const fp = recordFingerprint(record.method, record.url)
  return !!marks.fingerprints[fp]
}
