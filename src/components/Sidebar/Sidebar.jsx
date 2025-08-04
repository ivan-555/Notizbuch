import { useState } from "react"
import styles from "./Sidebar.module.css"

const Sidebar = ({setCurrentFilter, currentFilter, kategories, setDeleteKatModalStatus, setKatToDelete, setNewKatModalStatus}) => {
  const [sidebarStatus, setSidebarStatus] = useState("closed")

  function toggleSidebar() {
    if (sidebarStatus === "closed") {
      setSidebarStatus("open")
    } else {
      setSidebarStatus("closed")
    }
  }


  return (
    <div className={`${styles.sidebar} ${sidebarStatus === "open" ? styles.open : ""}`} onClick={(e) => {if (e.target.closest("li")) {setSidebarStatus("closed");}}}>
        <button className={styles.hamburger} onClick={toggleSidebar}>
            <svg viewBox="0 0 32 32" className={sidebarStatus === "open" ? styles.x : ""}>
              <path className={`${styles.line} ${styles.lineTopBottom}`} d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path className={styles.line} d="M7 16 27 16"></path>
            </svg>
        </button>
        <h1>Notizbuch</h1>
        <li onClick={(e) => {setCurrentFilter("Alle")}} className={currentFilter === "Alle" ? styles.active : ""}><i className="fa-solid fa-note-sticky"></i>Alle Notizen</li>
        <li onClick={(e) => {setCurrentFilter("Favorites")}} className={currentFilter === "Favorites" ? styles.active : ""}><i className="fa-solid fa-star"></i>Favoriten</li>
        <span className={styles.labelsText}>Labels</span>
        <ul className={styles.filters}>
          {
              kategories.map((kat, index) => (
              <li onClick={(e) => {setCurrentFilter(kat)}} className={currentFilter === kat ? styles.active : ""}>
                <i className={`fa-solid fa-tag ${styles.tag}`}></i>
                {kat}
                <i className={`fa-regular fa-square-minus ${styles.deleteButton}`} onClick={() => {setDeleteKatModalStatus("open"); setKatToDelete(kat)}}></i>
              </li>
              ))
          }
        </ul>
        <button className={styles.addLabelButton} onClick={() => {setNewKatModalStatus("open"); setSidebarStatus("closed")}}><i className="fa-regular fa-plus"></i>Neues Label</button>
        <li onClick={(e) => {setCurrentFilter("Trash")}} className={`${currentFilter === "Trash" ? styles.active : ""} ${styles.trashButton}`}><i className="fa-solid fa-trash-can"></i>Papierkorb</li>
    </div>
  )
}

export default Sidebar