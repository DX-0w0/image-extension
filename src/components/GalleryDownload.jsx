import { useRef, useState } from 'react'

function GalleryDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const urlRef = useRef('')
  const numberRef = useRef(1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!urlRef.current.value) return

    const url = urlRef.current.value

    chrome.runtime.sendMessage({ galleryDownload: { url } })
    // chrome.tabs.create({ url }, (tab) => {
    //   chrome.scripting.executeScript({
    //     target: { tabId: tab.id },
    //     files: ['content.js'],
    //   })

    //   // Send elementId after page loads
    //   chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
    //     if (tabId === tab.id && info.status === 'complete') {
    //       chrome.tabs.sendMessage(tab.id, { action: 'extractLinks', elementId })
    //       chrome.tabs.onUpdated.removeListener(listener)
    //     }
    //   })

    //   chrome.runtime.onMessage.addListener((msg) => {
    //     if (msg.action === 'returnLinks') {
    //       const ul = document.getElementById('results')
    //       ul.innerHTML = ''
    //       msg.hrefs.forEach((href) => {
    //         const li = document.createElement('li')
    //         li.textContent = href
    //         ul.appendChild(li)
    //       })
    //     }
    //   })
    // })
  }

  return (
    <div className='gallery-download'>
      <form onSubmit={handleSubmit}>
        <input ref={urlRef} type='url' placeholder='Enter file URL' required />
        <button type='submit'>Download</button>
      </form>
    </div>
  )
}

export default GalleryDownload
