import {useRef} from "react"
import styles from "./NewNoteModal.module.css"

const NewNoteModal = ({setNewNoteModalStatus, setAllNotes, kategories}) => {
    const titelInputRef = useRef(null)
    const textAreaRef = useRef(null)
    const dropdownRef = useRef(null)
    const favoriteButtonRef = useRef(null)

    function addNote() {
        const titel = titelInputRef.current.value.trim()
        const text = textAreaRef.current.value.trim()
        const kategorie = dropdownRef.current.value
        const favoriteStatus = favoriteButtonRef.current.classList.contains(styles.active)

        if (titel === "") {
            titelInputRef.current.classList.add(styles.invalid)
            setTimeout(() => {
            titelInputRef.current.classList.remove(styles.invalid)
            }, 500)
            return
        } else if (text === "") {
            textAreaRef.current.classList.add(styles.invalid)
            setTimeout(() => {
            textAreaRef.current.classList.remove(styles.invalid)
            }, 500)
            return
        }

        const newNote = {
            title: titel,
            text: text,
            kategorie: kategorie,
            favorite: favoriteStatus,
            id: crypto.randomUUID()
        }

        setAllNotes(prev => [...prev, newNote]);

        setNewNoteModalStatus("closed")
    }


  return (
    <div className={styles.newNoteModal}>
        <button className={styles.closeButton} onClick={() => setNewNoteModalStatus("closed")}><i className="fa-regular fa-circle-xmark"></i></button>
        <span>Neue Notiz</span>
        <input maxLength={15} autoFocus ref={titelInputRef} className={styles.titelInput} type="text" placeholder='Titel'/>
        <textarea ref={textAreaRef} className={styles.textArea} placeholder='Text'/>
        <select ref={dropdownRef} className={styles.dropdown}>
        <option value="- - -">Wähle ein Label</option>
        {
            kategories.map((kat) => (
            <option value={kat}>{kat}</option>
            ))
        }
        </select>
        <i className={`fa-regular fa-star ${styles.favoriteButton}`} onClick={(e) => e.target.classList.toggle(styles.active)} ref={favoriteButtonRef}></i>
        <button className={styles.addNoteButton} onClick={addNote}>Hinzufügen</button>
    </div>
  )
}

export default NewNoteModal