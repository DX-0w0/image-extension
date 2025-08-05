import {
  createImageFolder,
  buildImageUrls,
  downloadAllImages,
  buildImageUrlsFromGallery,
} from './downloadImages.js'

// Original source of image, works only with incrementing numbers
const url = 'https://www.xyz.com/abc/1.jpg'
const totalImages = 3

// Gallery link
const galleryUrl = 'https://www.xyz.org/g/123/'

async function run() {
  createImageFolder()

  const imageUrls = await buildImageUrls(url, totalImages)
  // const imageUrls = await buildImageUrlsFromGallery(galleryUrl)

  downloadAllImages(imageUrls)
}

run()
