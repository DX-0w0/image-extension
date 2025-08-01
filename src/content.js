console.log('Content script running on', window.location.href)

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'extractLinks') {
//     const container = document.getElementById(request.elementId)
//     const links = container ? Array.from(container.querySelectorAll('a')) : []
//     const hrefs = links.map((a) => a.href)
//     chrome.runtime.sendMessage({ action: 'returnLinks', hrefs })
//   }
// })
