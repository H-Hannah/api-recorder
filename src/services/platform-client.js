/**
 * API Test Platform 客户端
 * 对接 Go 后端 /api/v1
 */

import { getChromeStorage } from '../utils/dataHelpers.js'

const STORAGE_KEY = 'platformConfig'

export async function loadConfig() {
  const result = await getChromeStorage(STORAGE_KEY)
  return result[STORAGE_KEY] || null
}

export async function saveConfig(config) {
  return new Promise((resolve, reject) => {
    window.chrome.storage.local.set({ [STORAGE_KEY]: config }, () => {
      if (window.chrome.runtime.lastError) {
        reject(new Error(window.chrome.runtime.lastError.message))
      } else {
        resolve(config)
      }
    })
  })
}

function apiUrl(baseUrl, path) {
  return `${baseUrl.replace(/\/$/, '')}${path}`
}

function headers(token) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

/**
 * 测试平台连接
 */
export async function testConnection(config) {
  const { baseUrl, apiToken } = config
  const health = await fetch(apiUrl(baseUrl, '/health'))
  if (!health.ok) {
    throw new Error(`健康检查失败: HTTP ${health.status}`)
  }
  const productsRes = await fetch(apiUrl(baseUrl, '/api/v1/products'), {
    headers: headers(apiToken)
  })
  if (!productsRes.ok) {
    const err = await productsRes.json().catch(() => ({}))
    throw new Error(err.error || `鉴权失败: HTTP ${productsRes.status}`)
  }
  const products = await productsRes.json()
  return { ok: true, products }
}

/**
 * 获取产品列表
 */
export async function listProducts(config) {
  const res = await fetch(apiUrl(config.baseUrl, '/api/v1/products'), {
    headers: headers(config.apiToken)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}

/** 获取全局运行环境 */
export async function listEnvironments(config) {
  const res = await fetch(apiUrl(config.baseUrl, '/api/v1/environments'), {
    headers: headers(config.apiToken)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  const list = await res.json()
  const order = { BETA: 0, PRE: 1, PROD: 2 }
  return [...list].sort((a, b) => (order[a.name] ?? 9) - (order[b.name] ?? 9))
}

/** 从 URL 推断服务名（anchor / quest / trex 等），供 AI 分目录 */
export function inferServiceFromUrl(url) {
  try {
    const u = new URL(url)
    const host = (u.hostname || '').toLowerCase()
    if (host.includes('openreplay')) return 'openreplay'
    if (host.includes('anchor')) return 'anchor'
    if (host.includes('quest')) return 'quest'
    if (host.includes('trex') || host.includes('dipbit')) return 'trex'
    if (host.includes('edgen') || host.includes('ospprotocol')) return 'edgen'
    const parts = host.split('.')
    const first = parts[0]
    if (first && !['www', 'api', 'm', 'app'].includes(first)) return first
    const seg = u.pathname.split('/').filter(Boolean)[0]
    if (seg && !['api', 'v1', 'v2', 'v3'].includes(seg)) return seg
  } catch { /* */ }
  return ''
}

function fullPathFromUrl(url) {
  try {
    const u = new URL(url)
    return u.pathname + (u.search || '')
  } catch {
    return url || ''
  }
}

/**
 * 将录制条目转为平台 RawRecord（含完整 path，供 AI 按服务分目录）
 */
export function trafficToRecords(items) {
  return (items || []).map(item => {
    const url = item.url || ''
    return {
      url,
      path: item.path || fullPathFromUrl(url),
      host: (() => { try { return new URL(url).hostname } catch { return '' } })(),
      service: item.service || inferServiceFromUrl(url),
      method: item.method || 'GET',
      requestHeaders: normalizeHeaders(item.requestHeaders),
      requestBody: stringifyBody(item.requestBody),
      responseBody: stringifyBody(item.responseBody),
      statusCode: item.statusCode || 200,
      timestamp: item.timestamp || Date.now(),
      requestId: item.requestId || ''
    }
  }).sort((a, b) => a.timestamp - b.timestamp)
}

function normalizeHeaders(h) {
  if (!h || typeof h !== 'object') return {}
  const out = {}
  for (const [k, v] of Object.entries(h)) {
    out[k] = String(v)
  }
  return out
}

function stringifyBody(body) {
  if (body == null || body === '') return ''
  if (typeof body === 'string') return body
  try {
    return JSON.stringify(body)
  } catch {
    return String(body)
  }
}

/**
 * AI 入库：接口定义（仅概览，不含断言）
 */
export async function ingestApis(config, { hint, records }) {
  return ingest(config, {
    mode: 'api',
    hint: hint || '',
    records: trafficToRecords(records)
  })
}

/**
 * AI 入库：单接口多案例（test_datasets + 断言）
 */
export async function ingestApiCases(config, { apiId, hint, records }) {
  return ingest(config, {
    mode: 'api_cases',
    api_id: apiId,
    hint: hint || '',
    records: trafficToRecords(records)
  })
}

/**
 * AI 入库：线性场景（自动分组；运行环境在 Web 端执行时选择）
 */
export async function ingestScenario(config, { hint, records }) {
  return ingest(config, {
    mode: 'scenario',
    hint: hint || '',
    records: trafficToRecords(records)
  })
}

const AI_HINT_SUFFIX =
  '断言 expected 字段请使用字符串（如 "200"、"0"），不要使用 JSON 布尔值。'

function mergeIngestHint(hint) {
  const user = (hint || '').trim()
  return user ? `${user}\n${AI_HINT_SUFFIX}` : AI_HINT_SUFFIX
}

async function ingest(config, payload) {
  if (payload.hint !== undefined) {
    payload = { ...payload, hint: mergeIngestHint(payload.hint) }
  }
  const res = await fetch(apiUrl(config.baseUrl, '/api/v1/ai/ingest'), {
    method: 'POST',
    headers: headers(config.apiToken),
    body: JSON.stringify(payload)
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `入库失败: HTTP ${res.status}`)
  }
  return data
}
