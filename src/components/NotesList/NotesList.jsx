import styles from "./NotesList.module.css"
import Card from '../Card/Card'

const NotesList = ({currentFilter, allNotes, setAllNotes, setTrash, trash, kategories, setEmptyTrashModal}) => {
  return (
    <div className={styles.notesList}>
        <div className={styles.inner}>
          {(currentFilter === "Alle"
              ? allNotes
              : currentFilter === "Favorites"
              ? allNotes.filter(note => note.favorite)
              : currentFilter === "Trash"
              ? trash
              : allNotes.filter(note => note.kategorie === currentFilter)
            ).map((note, index) => (
              <Card key={note.id} note={note} setAllNotes={setAllNotes} allNotes={allNotes} setTrash={setTrash} kategories={kategories} currentFilter={currentFilter}/>
            ))}
        </div>
        {
        currentFilter === "Trash" && trash.length > 0 && (
          <button className={styles.emptyTrashButton} onClick={() => setEmptyTrashModal("open")}>
            <i className="fa-solid fa-triangle-exclamation" /> Papierkorb leeren
          </button>
        )}
    </div>
  )
}

export default NotesList