// Hooks
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useState } from "react"
// Styles
import "./variables.css"
import "./index.css"
import styles from "./app.css"
// Components
import NewNoteModal from "./components/NewNoteModal/NewNoteModal"
import NewKatModal from "./components/NewKatModal/NewKatModal"
import DeleteKatModal from "./components/DeleteKatModal/DeleteKatModal"
import Sidebar from "./components/Sidebar/Sidebar"
import NotesList from "./components/NotesList/NotesList"
import EmptyTrashModal from "./components/EmptyTrashModal/EmptyTrashModal"


const App = () => {
  // States
  const [allNotes, setAllNotes] = useLocalStorage("notes", []);
  const [kategories, setKategories] = useLocalStorage("categories", []);
  const [trash, setTrash] = useLocalStorage("trash", []);
  const [currentFilter, setCurrentFilter] = useState("Alle")
  const [newNoteModalStatus, setNewNoteModalStatus] = useState("closed")
  const [newKatModalStatus, setNewKatModalStatus] = useState("closed")
  const [deleteKatModalStatus, setDeleteKatModalStatus] = useState("closed")
  const [katToDelete, setKatToDelete] = useState(null)
  const [emptyTrashModal, setEmptyTrashModal] = useState("closed")

  return (
    <div className={styles.notebook}>
      <h1 className={styles.heading}>Notizbuch</h1>

      {/* ----- Modals ------------*/}
      {
        newNoteModalStatus === "open" ? 
        <NewNoteModal setNewNoteModalStatus={setNewNoteModalStatus} setAllNotes={setAllNotes} kategories={kategories}/>
        :
        null
      }
      {
        newKatModalStatus === "open" ?
        <NewKatModal setKategories={setKategories} setNewKatModalStatus={setNewKatModalStatus}/>
        :
        null
      }
      {
        deleteKatModalStatus === "open" ?
        <DeleteKatModal setDeleteKatModalStatus={setDeleteKatModalStatus} katToDelete={katToDelete} setKategories={setKategories} kategories={kategories} setAllNotes={setAllNotes} allNotes={allNotes} setTrash={setTrash}/>
        :
        null
      }
      {
        emptyTrashModal === "open" ?
        <EmptyTrashModal setEmptyTrashModal={setEmptyTrashModal} setTrash={setTrash} trash={trash}/>
        :
        null
      }

      <Sidebar setCurrentFilter={setCurrentFilter} currentFilter={currentFilter} kategories={kategories} setDeleteKatModalStatus={setDeleteKatModalStatus} setKatToDelete={setKatToDelete} setNewKatModalStatus={setNewKatModalStatus}/>
      
      <NotesList currentFilter={currentFilter} allNotes={allNotes} setAllNotes={setAllNotes} setTrash={setTrash} trash={trash} kategories={kategories} setEmptyTrashModal={setEmptyTrashModal}/>

      <button className={styles.newNoteButton} onClick={() => setNewNoteModalStatus("open")}><i className="fa-solid fa-pen-to-square"></i></button>
    </div>
  )
}

export default App