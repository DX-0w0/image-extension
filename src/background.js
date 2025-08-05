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
    const galleryUrl = request.galleryDownload.url

    async function galleryDownloader() {
      const imageUrls = (await buildImageUrlsFromGallery(galleryUrl)) || []

      for (const [index, imageUrl] of imageUrls.entries()) {
        const pageNumber = index + 1
        downloadHelper(imageUrl, pageNumber)
      }

      sendResponse({ count: imageUrls.length })
    }

    galleryDownloader()
    return true // IMPORTANT: keep the message channel open for async response
  }
})
