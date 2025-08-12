import { useRef, useState } from 'react'

function GalleryDownload({ handleNotify }) {
  const [isDownloading, setIsDownloading] = useState(false)
  const urlRef = useRef('')
  const numberRef = useRef(1)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!urlRef.current.value) return
    setIsDownloading(true)

    const url = urlRef.current.value
    const totalPage = numberRef.current.value || 1

    chrome.runtime.sendMessage({ galleryDownload: { url, totalPage } }, (response) => {
      console.log('Background response:', response)
      if (response?.count === 0) {
        handleNotify()
      }
    })

    setTimeout(() => setIsDownloading(false), 1000)
  }

  return (
    <div className='gallery-download'>
      <p>Gallery Image Url</p>
      <form onSubmit={handleSubmit}>
        <input
          ref={urlRef}
          type='url'
          placeholder='Enter gallery URL'
          required
        />
        <input
          ref={numberRef}
          type='number'
          placeholder='Enter total pages'
          min='0'
        />
        <button type='submit' disabled={isDownloading}>
          Download
        </button>
      </form>
    </div>
  )
}

export default GalleryDownload
