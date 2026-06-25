/* global chrome */
import { createApp } from 'vue'
import App from './components/Control.vue'

createApp(App).mount('#app')

function openDrawerOnce(tab) {
  if (!tab || !tab.url) return
  if (tab.url.indexOf('http://') !== 0 && tab.url.indexOf('https://') !== 0) return

  chrome.storage.local.set({ hostRecordTabId: tab.id, hostRecordTabUrl: tab.url || '' }, function () {
    chrome.tabs.sendMessage(tab.id, { action: 'open_drawer', tabId: tab.id }, function () {
      if (chrome.runtime.lastError) {
        setTimeout(function () {
          chrome.tabs.sendMessage(tab.id, { action: 'open_drawer', tabId: tab.id }, function () {
            window.close()
          })
        }, 300)
        return
      }
      window.close()
    })
  })
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  openDrawerOnce(tabs && tabs[0])
})
