import { useRef, useState } from 'react'

function SourceDownload({ handleNotify }) {
  const [isDownloading, setIsDownloading] = useState(false)

  const urlRef = useRef('')
  const numberRef = useRef(1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!urlRef.current.value || !numberRef.current.value) return
    setIsDownloading(true)

    const url = urlRef.current.value
    const totalImages = numberRef.current.value

    chrome.runtime.sendMessage(
      { sourceDownload: { url, totalImages } },
      (response) => {
        // console.log('Background response:', response)
        if (response?.count === 0) {
          handleNotify()
        }
      }
    )

    setTimeout(() => setIsDownloading(false), 1000)
  }

  return (
    <div className='source-download'>
      <p>Source Image Url</p>
      <form onSubmit={handleSubmit}>
        <input
          ref={urlRef}
          type='url'
          placeholder='Enter source image URL'
          required
        />
        <input
          ref={numberRef}
          type='number'
          placeholder='Enter total images'
          min='0'
          required
        />
        <button type='submit' disabled={isDownloading}>
          Download
        </button>
      </form>
    </div>
  )
}

export default SourceDownload
