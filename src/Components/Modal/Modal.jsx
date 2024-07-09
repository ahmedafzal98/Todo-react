import { useContext, useState, useEffect } from "react";
import style from "./Modal.module.css";
import { NoteContext } from "../../context/NoteContext";

function Modal(props) {
  const { notes, setNotes, setFilteredNotes, selectedNote, setSearchInputValue } = useContext(NoteContext);
  const [newNote, setNewNote] = useState({ note: "", index: null });

  console.log("Selected Index", selectedNote);

  useEffect(() => {
    setNewNote(selectedNote);
  }, [selectedNote]);

  function handleCancel() {
    props.isOpen(false);
  }

  function handleApply() {
    if (newNote.index !== null && newNote.index !== undefined) {
      console.log("New Note Index", newNote.index);
      const updatedNotes = [...notes];
      // console.log("Updated Notes", updatedNotesnewNote.index);
      updatedNotes[newNote.index] = { ...updatedNotes[newNote.index], note: newNote.note };
      setNotes(updatedNotes);
    } else {
      setNotes((prevNotes) => [...prevNotes, { note: newNote.note, isChecked: false, index: notes.length }]);
    }
    setNewNote({ note: "", index: null });
    setFilteredNotes([])
    setSearchInputValue("")
    handleCancel();
  }

  function handleChange(event) {
    setNewNote({ ...newNote, note: event.target.value });
  }

  return (
    <div className={style.overlay}>
      <div className={style.modal_container}>
        <span>NEW NOTE</span>
        <input
          type="text"
          placeholder="Enter New Note.."
          onChange={handleChange}
          value={newNote.note || ""}
          id={style.add_note_input}
        />
        <div className={style.buttons}>
          <button onClick={handleCancel} className={style.cancel_btn}>
            Cancel
          </button>
          <button onClick={handleApply} className={style.apply_btn}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
