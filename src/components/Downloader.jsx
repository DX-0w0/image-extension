import { useState } from 'react'
import SourceDownload from './SourceDownload'
import GalleryDownload from './GalleryDownload'

import style from './Downloader.module.scss'

function Downloader() {
  const [hasNotify, setHasNotify] = useState(false)

  function handleNotify() {
    setHasNotify(true)
    setTimeout(() => setHasNotify(false), 5000)
  }

  return (
    <div className={style.downloader}>
      <SourceDownload handleNotify={handleNotify} />
      <GalleryDownload handleNotify={handleNotify} />
      {hasNotify && <p className={style.notify}>No Image Urls were found.</p>}
    </div>
  )
}

export default Downloader
