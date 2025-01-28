import style from "./Notes.module.css";
import uncheck from "../../assets/icons/Rectangle.svg";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/delete.svg";
import check from "../../assets/icons/check.svg";
import { useContext, useEffect } from "react";
import { NoteContext } from "../../context/NoteContext";
import EmptyList from "../EmptyList/EmptyList";

function Notes(prop) {
  const {
    setNotes,
    setSelectedNote,
    notes,
    filteredNotes,
    setFilteredNotes,
    setSearchInputValue,
  } = useContext(NoteContext);

  useEffect(() => {
    fetch("/api/todos")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((err) => console.log(`Error while Fetching Todos ${err}`));
  }, []);

  if (notes.length === 0 && filteredNotes.length === 0) {
    return <EmptyList />;
  }
  const updatedNotes = filteredNotes.length > 0 ? filteredNotes : notes;

  function handleEditClick(note, index) {
    setSelectedNote({
      note: note,
      index: index,
    });
    prop.onEdit(true);
  }
  function handleDeleteClick(id, index) {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    setFilteredNotes([]);
    setSearchInputValue("");

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`/api/todos/${id}`, requestOptions).then((res) =>
      res
        .json()
        .then((data) => console.log(data.message))
        .catch((err) => console.log(`Error while Fetching Todos ${err}`))
    );
  }
  function handleCheckClick(note, id) {
    console.log(note);

    setNotes((prevNotes) =>
      prevNotes.map((note, i) =>
        note._id === id ? { ...note, isCompleted: !note.isCompleted } : note
      )
    );
    setFilteredNotes((prevNotes) =>
      prevNotes.map((note, i) =>
        note._id === id ? { ...note, isCompleted: !note.isCompleted } : note
      )
    );
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({ isCompleted: !note.isCompleted }),
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
    };
    fetch(`/api/todos/${id}`, requestOptions).then((res) =>
      res
        .json()
        .then((data) => console.log(data))
        .catch((err) => console.log(`Error while Fetching Todos ${err}`))
    );
  }
  return (
    <div className={style.notes}>
      <ul>
        {updatedNotes.map((notes, index) => (
          <div key={index}>
            <li>
              <div
                className={`${style.note} ${
                  notes.isCompleted ? style.disabled : ""
                }`}
                onClick={() => handleCheckClick(notes, notes._id)}
              >
                <img src={uncheck} alt="Uncheck" />
                {notes.isCompleted && (
                  <img className={style.check} src={check} alt="Check" />
                )}
                <span>{notes.note}</span>
              </div>
              <div
                className={`${style.options} ${
                  notes.isCompleted ? style.options_disabled : ""
                }`}
              >
                <img
                  onClick={() => handleEditClick(notes, notes._id)}
                  src={edit}
                  alt="Edit Icon"
                />
                <img
                  onClick={() => handleDeleteClick(notes._id, index)}
                  src={trash}
                  alt="Delete Icon"
                />
              </div>
            </li>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
}
export default Notes;
