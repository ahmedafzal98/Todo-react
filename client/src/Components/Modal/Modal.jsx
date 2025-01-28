import { useContext, useState, useEffect, useRef } from "react";
import style from "./Modal.module.css";
import { NoteContext } from "../../context/NoteContext";

function Modal(props) {
  const {
    notes,
    setNotes,
    setFilteredNotes,
    selectedNote,
    setSearchInputValue,
  } = useContext(NoteContext);
  const [newNote, setNewNote] = useState({ note: {} });
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    setNewNote(selectedNote.note || "");
  }, [selectedNote]);
  useEffect(() => {
    if (props.isOpen) {
      inputRef.current.focus();
    }
  }, [props.isOpen]);

  function handleCancel() {
    props.isOpen(false);
    setError("");
  }

  function handleApply() {
    console.log("New Note", newNote);

    if (newNote.note === undefined) {
      return setError("Please Enter Note");
    }
    if (newNote._id !== null && newNote._id !== undefined) {
      let updatedNotes = [...notes];
      updatedNotes = updatedNotes.map((note) =>
        note._id === newNote._id ? { ...note, note: newNote.note } : note
      );

      setNotes(updatedNotes);

      const requestOptions = {
        method: "PUT",
        body: JSON.stringify({ note: newNote.note }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(`/api/todos/${newNote._id}`, requestOptions).then((res) =>
        res
          .json()
          .then((data) => console.log(data.message))
          .catch((err) => console.log(`Error while Fetching Todos ${err}`))
      );
    } else {
      setNotes((prevNotes) => [
        ...prevNotes,
        { note: newNote.note, isChecked: false, index: notes.length },
      ]);

      const requestOptions = {
        method: "POST",
        body: JSON.stringify({ note: newNote.note }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(`/api/todos/`, requestOptions).then((res) =>
        res
          .json()
          .then((data) => console.log(data.message))
          .catch((err) => console.log(`Error while Fetching Todos ${err}`))
      );
    }
    // setNewNote({ note: "", index: null });
    setFilteredNotes([]);
    setSearchInputValue("");
    setError("");
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
