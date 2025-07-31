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

export function savedFilenameHelper(url) {
  const { filename: FN, extension, imageNumber } = imageUrlHelper(url)
  let filename = FN

  if (imageNumber < 10) {
    filename = `0${imageNumber}${extension}`
  }

  return filename
}

export function buildImageUrls(url, totalImages) {
  const { imageNumber, urlWithoutFilename, extension } = imageUrlHelper(url)

  const imageUrls = []
  for (let i = 0; i < totalImages; i++) {
    imageUrls.push(`${urlWithoutFilename}/${imageNumber + i}${extension}`)
  }

  console.log('imageUrls', imageUrls)
  return imageUrls
}
