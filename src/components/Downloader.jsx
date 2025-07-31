import { useState } from 'react'
import SourceDownload from './SourceDownload'

function Downloader() {
  const [isDownloading, setIsDownloading] = useState(false)

  return (
    <div className='downloader'>
      <SourceDownload />
    </div>
  )
}

export default Downloader
