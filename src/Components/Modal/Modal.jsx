import { useContext, useState, useEffect, useRef } from "react";
import style from "./Modal.module.css";
import { NoteContext } from "../../context/NoteContext";

function Modal(props) {
  const { notes, setNotes, setFilteredNotes, selectedNote, setSearchInputValue } = useContext(NoteContext);
  const [newNote, setNewNote] = useState({ note: "", index: null });
  const [error, setError] = useState("")

  const inputRef = useRef(null);

  useEffect(() => {
    setNewNote(selectedNote);
  }, [selectedNote]);
  useEffect(() => {
    if (props.isOpen) {
      inputRef.current.focus();
    }
  }, [props.isOpen]);

  function handleCancel() {
    props.isOpen(false);
    setError("")
  }

  function handleApply() {
    if (newNote.note === undefined || newNote.note.trim() === '') {
      return setError("Please Enter Note")
    }
    if (newNote.index !== null && newNote.index !== undefined) {
      const updatedNotes = [...notes];
      updatedNotes[newNote.index] = { ...updatedNotes[newNote.index], note: newNote.note };
      setNotes(updatedNotes);
    } else {
      setNotes((prevNotes) => [...prevNotes, { note: newNote.note, isChecked: false, index: notes.length }]);
    }
    setNewNote({ note: "", index: null });
    setFilteredNotes([])
    setSearchInputValue("")
    setError("")
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
          ref={inputRef}
          id={style.add_note_input}
        />
        {error && <p className={style.errorText}>{error}</p>}
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
