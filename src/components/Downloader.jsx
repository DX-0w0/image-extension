import { useState } from 'react'
import SourceDownload from './SourceDownload'
import GalleryDownload from './GalleryDownload'

function Downloader() {
  const [isDownloading, setIsDownloading] = useState(false)

  return (
    <div className='downloader'>
      <SourceDownload />
      <GalleryDownload />
    </div>
  )
}

export default Downloader
