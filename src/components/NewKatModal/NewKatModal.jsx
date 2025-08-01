import {useRef} from "react"
import styles from "./NewKatModal.module.css"

const NewKatModal = ({setKategories, setNewKatModalStatus}) => {
    const newKatInputRef = useRef(null)

    function addKat() {
      if (newKatInputRef.current.value.trim() === "") {
          newKatInputRef.current.classList.add(styles.invalid)
          setTimeout(() => {
          newKatInputRef.current.classList.remove(styles.invalid)
          }, 500)
          return
      }
      setKategories(prev => [...prev, newKatInputRef.current.value])
      setNewKatModalStatus("closed")
    }

  return (
    <div className={styles.newKatModal}>
        <button className={styles.closeButton} onClick={() => setNewKatModalStatus("closed")}><i className="fa-regular fa-circle-xmark"></i></button>
        <span>Neues Label</span>
        <input maxLength={15} autoFocus ref={newKatInputRef} className={styles.katInput} type="text" placeholder='Label' onKeyDown={(e) => {if(e.key === "Enter") {addKat()}}}/>
        <button className={styles.addKatButton} onClick={addKat}>Hinzufügen</button>
    </div>
  )
}

export default NewKatModal