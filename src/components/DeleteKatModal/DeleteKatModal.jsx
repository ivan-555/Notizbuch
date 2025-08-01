import styles from "./DeleteKatModal.module.css"

const DeleteKatModal = ({setDeleteKatModalStatus, katToDelete, setKategories, kategories, setAllNotes, allNotes, setTrash}) => {
    
    function delKat() {
        setKategories(kategories.filter((kat) => kat !== katToDelete))
        setAllNotes(allNotes.filter((note) => note.kategorie !== katToDelete))
        setTrash(prev => [...prev, ...allNotes.filter((note) => note.kategorie == katToDelete)])
        setDeleteKatModalStatus("closed")
    }

  return (
    <div className={styles.deleteKatModal}>
        <button className={styles.closeButton} onClick={() => setDeleteKatModalStatus("closed")}><i className="fa-regular fa-circle-xmark"></i></button>
        <span>Label {katToDelete} löschen?</span>
        <span className={styles.warning}>Achtung zugehörige Notizen gehen verloren!</span>
        <button className={styles.deleteKatButton} onClick={delKat}>Löschen</button>
    </div>
  )
}

export default DeleteKatModal