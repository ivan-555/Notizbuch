import { useEffect, useRef } from "react"
import styles from "./Preloader.module.css"

const Preloader = () => {
    const preloaderRef = useRef(null)

    useEffect(() => {
    window.addEventListener("load", () => {
        setTimeout(() => {
        preloaderRef.current.classList.add(styles.hidden);
        }, 2100)
    })
    }, [])

  return (
    <div className={styles.preloader} ref={preloaderRef}>
        <h1>Notizbuch</h1>
    </div>
  )
}

export default Preloader