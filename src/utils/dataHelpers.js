/**
 * 数据辅助工具函数
 */

export function formatHeadersArray(headers) {
  return Object.entries(headers || {}).map(([name, value]) => ({
    name,
    value: String(value)
  }))
}

/** 导出 JSON 用结构 */
export function formatExportJson(selectedData, formatHeaders) {
  const formattedData = {}
  selectedData.forEach((item, index) => {
    const requestKey = `${item.method} ${item.url} [${item.requestId}]`
    formattedData[`测试用例 [${index}]`] = {
      [requestKey]: {
        url: item.url,
        method: item.method,
        headers: formatHeaders(item.requestHeaders),
        body: item.requestBody,
        timestamp: item.timestamp,
        response: {
          status: item.statusCode || 200,
          body: item.responseBody || null
        }
      }
    }
  })
  return formattedData
}

export function downloadJsonFile(data, filenamePrefix = 'RECORD') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const date = new Date()
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}`
  a.download = `${filenamePrefix}-${formattedDate}.json`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

export function getChromeStorage(key) {
  return new Promise((resolve, reject) => {
    window.chrome.storage.local.get(key, (result) => {
      if (window.chrome.runtime.lastError) {
        reject(new Error(window.chrome.runtime.lastError.message))
      } else {
        resolve(result)
      }
    })
  })
}

export function setChromeStorage(data) {
  return new Promise((resolve, reject) => {
    window.chrome.storage.local.set(data, () => {
      if (window.chrome.runtime.lastError) {
        reject(new Error(window.chrome.runtime.lastError.message))
      } else {
        resolve()
      }
    })
  })
}
