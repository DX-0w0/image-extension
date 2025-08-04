import axios from 'axios'
import * as cheerio from 'cheerio'

export function imageUrlHelper(imageUrl) {
  const newUrl = new URL(imageUrl)

  const parts = newUrl.pathname.split('/')
  const filename = parts.pop()
  const pathnameWithoutFilename = parts.join('/')

  const urlWithoutFilename = `${newUrl.origin}${pathnameWithoutFilename}`
  const extension = `.${filename.split('.')[1]}`
  let imageNumber = parseInt(filename.split('.')[0])

  return {
    filename,
    urlWithoutFilename,
    extension,
    imageNumber,
  }
}

export function savedFilename(url, pageNumber = undefined) {
  const { filename: FN, extension, imageNumber } = imageUrlHelper(url)
  let filename = FN
  let currentNumber = pageNumber || imageNumber

  if (currentNumber < 10) {
    filename = `0${currentNumber}${extension}`
  } else if (pageNumber) {
    filename = `${pageNumber}${extension}`
  }

  return filename
}

export function buildImageUrls(url, totalImages) {
  const { imageNumber, urlWithoutFilename, extension } = imageUrlHelper(url)

  const imageUrls = []

  if (extension === '.undefined') {
    return imageUrls
  }

  for (let i = 0; i < totalImages; i++) {
    imageUrls.push(`${urlWithoutFilename}/${imageNumber + i}${extension}`)
  }

  console.log('imageUrls', imageUrls)
  return imageUrls
}

export async function buildGalleryPageLinks(url) {
  try {
    const response = await axios(url)
    const $ = cheerio.load(response.data)

    const galleryContainer = $('#gdt')
    const links = galleryContainer.find('a')

    const hrefs = links
      .map((i, el) => {
        return $(el).attr('href')
      })
      .get()

    return hrefs || []
  } catch (error) {
    console.error(`❌ Failed to get links from gallery`, error.message)
    return []
  }
}

export async function buildImageUrlsFromGallery(url) {
  const imageUrls = []
  const links = await buildGalleryPageLinks(url)

  for (const link of links) {
    try {
      const response = await axios(link)
      const $ = cheerio.load(response.data)
      const img = $('#img').attr('src')
      imageUrls.push(img)
    } catch (error) {
      console.error(`❌ Failed link ${link}`, error.message)
    }
  }

  console.log('imageUrls', imageUrls)
  return imageUrls
}
