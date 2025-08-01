import styles from "./EmptyTrashModal.module.css"

const EmptyTrashModal = ({setEmptyTrashModal, setTrash, trash}) => {
    function clearTrash() {
        setEmptyTrashModal("closed")
        if (trash.length === 0) return;
        setTrash([]);
    }

  return (
    <div className={styles.emptyTrashModal}>
        <button className={styles.closeButton} onClick={() => setEmptyTrashModal("closed")}><i className="fa-regular fa-circle-xmark"></i></button>
        <span>Papierkorb leeren?</span>
        <span className={styles.warning}>Achtung Notizen können nicht wiederhergestellt werden!</span>
        <button className={styles.confirmButton} onClick={clearTrash}>Leeren</button>
    </div>
  )
}

export default EmptyTrashModal