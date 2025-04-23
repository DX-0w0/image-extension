import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { pipeline } from 'stream'
import { promisify } from 'util'

const streamPipeline = promisify(pipeline)

// Directory to save images
const __dirname = path.dirname(new URL(import.meta.url).pathname)
const saveDir = path.join(__dirname, 'images')

// Ensure the folder exists
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir)
}

// List of image URLs
// const imageUrls = [
//   'https://media.istockphoto.com/id/2163630620/photo/abstract-minimalist-product-display-with-pink-smoke-and-wooden-branches.webp?s=2048x2048&w=is&k=20&c=Mk2OWS5Wzx4GeMROu0ZykAluoZeNceeSDKqnbA9Rzy8=',
//   'https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
// ]

// Change url and totalImages according to the need
const url = 'https://example.com/xa125/1.jpg'
const totalImages = 3

async function buildImageUrls(url, totalImages) {
  const newUrl = new URL(url)

  const parts = newUrl.pathname.split('/')
  const fileName = parts.pop()
  const basePath = parts.join('/')

  const baseUrl = `${newUrl.origin}${basePath}`
  const extension = path.extname(fileName)

  const imageUrls = new Array(totalImages)
    .fill(baseUrl)
    .map((url, i) => `${url}/${i + 1}${extension}`)
  console.log('imageUrls', imageUrls)

  return imageUrls
}

async function downloadImage(url, index = 0) {
  try {
    // const fileName = `${index}.jpg`
    let fileName = path.basename(new URL(url).pathname)
    const extension = path.extname(fileName)
    if (!extension) {
      fileName += '.jpg'
    }
    const filePath = path.join(saveDir, fileName)
    const response = await axios({
      method: 'get',
      url,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      responseType: 'stream',
    })

    await streamPipeline(response.data, fs.createWriteStream(filePath))
    console.log(`✅ Saved: ${fileName}`)
  } catch (err) {
    console.error(`❌ Failed to download from ${url}:`, err.message)
  }
}

async function downloadAllImages(imageUrls) {
  console.log('🚀 Downloading images...')
  await Promise.all(imageUrls.map((url, index) => downloadImage(url, index)))
  console.log('🎉 All images downloaded.')
}

async function run() {
  const imageUrls = await buildImageUrls(url, totalImages)
  downloadAllImages(imageUrls)
}

run()
