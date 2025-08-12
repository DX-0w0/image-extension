import {
  buildImageUrls,
  buildImageUrlsFromGallery,
  savedFilename,
} from './utils/imageBuilder'

console.log('Background script loaded.')

function downloadHelper(imageUrl, pageNumber = undefined) {
  const filename = savedFilename(imageUrl, pageNumber)
  const api = chrome.downloads ? chrome : browser

  api.downloads.download({
    url: imageUrl,
    filename: `MyImages/${filename}`,
  })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.sourceDownload) {
    const { url, totalImages } = request.sourceDownload

    const imageUrls = buildImageUrls(url, totalImages) || []

    for (const imageUrl of imageUrls) {
      downloadHelper(imageUrl)
    }

    sendResponse({ count: imageUrls.length })
    return true // IMPORTANT: keep the message channel open for async response
  }

  if (request.galleryDownload) {
    const { url: galleryUrl, totalPage } = request.galleryDownload

    async function galleryDownloader() {
      let pageNumber = 0

      for (let i = 1; i <= totalPage; i++) {
        const currentUrl = i === 1 ? galleryUrl : `${galleryUrl}?p=${i - 1}`
        const imageUrls = (await buildImageUrlsFromGallery(currentUrl)) || []

        for (const imageUrl of imageUrls) {
          pageNumber++
          downloadHelper(imageUrl, pageNumber)
        }
      }

      await sendResponse({ count: pageNumber })
    }

    galleryDownloader()
    return true // IMPORTANT: keep the message channel open for async response
  }
})
