import { buildImageUrls, savedFilenameHelper } from './utils/imageBuilder'

console.log('Background script loaded.')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('yes')

  if (request.sourceDownload) {
    const { url, totalImages } = request.sourceDownload

    const imageUrls = buildImageUrls(url, totalImages)

    for (const imageUrl of imageUrls) {
      const filename = savedFilenameHelper(imageUrl)

      chrome.downloads.download({
        url: imageUrl,
        filename: `MyImages/${filename}`,
      })
    }
    console.log('done')
  }
})
