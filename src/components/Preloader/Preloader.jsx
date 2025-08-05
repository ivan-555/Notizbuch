import { useEffect, useRef } from "react"
import styles from "./Preloader.module.css"

const Preloader = () => {
  const preloaderRef = useRef(null)

  useEffect(() => {
    const hide = () => {
      preloaderRef.current?.classList.add(styles.hidden)
    }

    // if already loaded before component mounts
    if (document.readyState === "complete") {
      setTimeout(hide, 2100)
    } else {
      window.addEventListener("load", () => setTimeout(hide, 2100))
    }

    return () => {
      window.removeEventListener("load", hide)
    }
  }, [])

  return (
    <div className={styles.preloader} ref={preloaderRef}>
      <h1>Notizbuch</h1>
    </div>
  )
}

export default Preloader
