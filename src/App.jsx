import Downloader from './components/Downloader'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.popupApp}>
      <h1>Image Sauce Extract</h1>
      <Downloader />
    </div>
  )
}

export default App
