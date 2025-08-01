import { useRef, useState } from 'react'

function SourceDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const urlRef = useRef('')
  const numberRef = useRef(1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!urlRef.current.value || !numberRef.current.value) return

    const url = urlRef.current.value
    const totalImages = numberRef.current.value
    
    chrome.runtime.sendMessage({ sourceDownload: { url, totalImages } })
  }

  return (
    <div className='source-download'>
      <form onSubmit={handleSubmit}>
        <input ref={urlRef} type='url' placeholder='Enter file URL' required />
        <input
          ref={numberRef}
          type='number'
          placeholder='Enter total images'
          required
        />
        <button type='submit'>Download</button>
      </form>
    </div>
  )
}

export default SourceDownload
