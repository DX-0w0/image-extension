import { useRef, useState } from 'react'

function GalleryDownload({ handleNotify }) {
  const [isDownloading, setIsDownloading] = useState(false)
  const urlRef = useRef('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!urlRef.current.value) return
    setIsDownloading(true)

    const url = urlRef.current.value

    chrome.runtime.sendMessage({ galleryDownload: { url } }, (response) => {
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
        <button type='submit' disabled={isDownloading}>
          Download
        </button>
      </form>
    </div>
  )
}

export default GalleryDownload
