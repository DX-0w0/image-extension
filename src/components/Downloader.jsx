import { useState } from 'react'
import SourceDownload from './SourceDownload'
import GalleryDownload from './GalleryDownload'

import style from './Downloader.module.scss'

function Downloader() {
  return (
    <div className={style.downloader}>
      <SourceDownload />
      <GalleryDownload />
    </div>
  )
}

export default Downloader
