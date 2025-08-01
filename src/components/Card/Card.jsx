import { useState, useRef, useEffect } from "react";
import styles from "./Card.module.css"

const Card = ({note, key, setAllNotes, allNotes, setTrash, kategories, currentFilter}) => {
  const [editMode, setEditMode] = useState(false)
  const [renderKey, setRenderKey] = useState(0); /* used to rerender Note when we exit editMode to restore old val*/

  const titelInputRef = useRef(null)
  const textAreaRef = useRef(null)
  const dropdownRef = useRef(null)
  const favoriteButtonRef = useRef(null)

  function overwriteNote() {
    if (titelInputRef.current.value.trim() === "") {
      titelInputRef.current.classList.add(styles.invalid)
      setTimeout(() => {
        titelInputRef.current.classList.remove(styles.invalid)
      }, 500);
      return false
    }
    if (textAreaRef.current.value.trim() === "") {
      textAreaRef.current.classList.add(styles.invalid)
      setTimeout(() => {
        textAreaRef.current.classList.remove(styles.invalid)
      }, 500);
      return false
    }

    const favoriteStatus = favoriteButtonRef.current.classList.contains(styles.active);

    const newNote = {
        title: titelInputRef.current.value,
        text: textAreaRef.current.value,
        kategorie: dropdownRef.current.value,
        favorite: favoriteStatus,
        id: note.id
    };

    setAllNotes(allNotes.map(n =>
        n.id === note.id ? newNote : n
    ));

    return true
  }

  function handleFavoriteStatus(e) {
    if (editMode) {
      e.target.classList.toggle(styles.active);
      if(e.target.classList.contains(styles.active)){
          e.target.classList.add(styles.animate)
      }
      setTimeout(() => {
          e.target.classList.remove(styles.animate)
      }, 300)
    }
  }

  useEffect(() => {
    if (editMode) {
      textAreaRef.current.focus();
    }
  }, [editMode]);

  function restoreNote(note) {
    setTrash(prev => prev.filter(t => t.id !== note.id));

    setAllNotes(prev => {
      if (prev.some(n => n.id === note.id)) return prev;
      return [...prev, note];
    });
  }
  
  return (
    <div className={styles.card} key={renderKey}>
        {
          currentFilter === "Trash" ?
            <i className={`fa-solid fa-rotate-left ${styles.restoreButton}`} onClick={() => restoreNote(note)}></i>
            :
            editMode ?
            <>
              <i className={`fa-solid fa-check ${styles.confirmButton}`} onClick={() => {const success = overwriteNote(); if (success) setEditMode(false);}}></i>
              <i className={`fa-solid fa-xmark ${styles.closeButton}`} onClick={() => {setEditMode(false); setRenderKey(prev => prev +1)}}></i>
            </>
            :
            <>
              <i className={`fa-solid fa-trash-can ${styles.deleteButton}`} onClick={() => {setAllNotes(allNotes.filter(n => n.id !== note.id)); setTrash(prev => [...prev, { ...note }])}}></i>
              <i className={`fa-solid fa-pen ${styles.editButton}`} onClick={() => setEditMode(true)}></i>
            </>
        }
        <input maxLength={15} ref={titelInputRef} type="text" className={`${styles.title} ${editMode ? styles.editable : ""}`} defaultValue={note.title} readOnly={!editMode}/>
        <textarea ref={textAreaRef} className={`${styles.text} ${editMode ? styles.editable : ""}`} defaultValue={note.text} readOnly={!editMode}/>
        <div className={styles.details}>
            <select ref={dropdownRef} className={`${styles.kategorie} ${editMode ? styles.editable : ""}`} defaultValue={note.kategorie} disabled={!editMode}>
                <option value="- - -">- - -</option>
                {
                    kategories.map((kat) => (
                    <option value={kat}>{kat}</option>
                    ))
                }
            </select>
            {
              note.favorite ? 
              <i ref={favoriteButtonRef} className={`fa-regular fa-star ${styles.favoriteStar} ${styles.active} ${editMode ? styles.editable : ""}`} onClick={handleFavoriteStatus}></i>
              :
              <i ref={favoriteButtonRef} className={`fa-regular fa-star ${styles.favoriteStar} ${editMode ? styles.editable : ""}`} onClick={handleFavoriteStatus}></i>
            }
        </div>
    </div>
  )
}

export default Card