import styles from "./Sidebar.module.css"

const Sidebar = ({setCurrentFilter, currentFilter, kategories, setDeleteKatModalStatus, setKatToDelete, setNewKatModalStatus}) => {
  return (
    <div className={styles.sidebar}>
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
        <button className={styles.addLabelButton} onClick={() => setNewKatModalStatus("open")}><i className="fa-regular fa-plus"></i>Neues Label</button>
        <li onClick={(e) => {setCurrentFilter("Trash")}} className={currentFilter === "Trash" ? styles.active : ""}><i className="fa-solid fa-trash-can"></i>Papierkorb</li>
    </div>
  )
}

export default Sidebar