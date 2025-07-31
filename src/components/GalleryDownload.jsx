import { useRef, useState } from 'react'

function SourceDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const urlRef = useRef('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!urlRef.current.value) return

    // 👇 Add your download logic here
    console.log('Downloading from:', urlRef.current.value)
  }

  return (
    <div className='source-download'>
      <form onSubmit={handleSubmit}>
        <input
          ref={urlRef}
          type='url'
          placeholder='Enter file URL'
          required
        />
        <button type='submit'>Download</button>
      </form>
    </div>
  )
}

export default SourceDownload
