import style from "./Notes.module.css";
import uncheck from "../../assets/icons/Rectangle.svg";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/delete.svg";
import check from "../../assets/icons/check.svg";
import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import EmptyList from "../EmptyList/EmptyList";

function Notes(prop) {

  const {
    setNotes,
    setSelectedNote,
    notes,
    filteredNotes,
    setFilteredNotes,
  } = useContext(NoteContext);

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
  function handleDeleteClick(index) {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setFilteredNotes([]);
    setNotes(newNotes);
  }
  function handleCheckClick(note, index) {
    setNotes(prevNotes =>
      prevNotes.map((note, i) =>
        note.index === index ? { ...note, isChecked: !note.isChecked } : note
      )
    );
    setFilteredNotes(prevNotes =>
      prevNotes.map((note, i) =>
        note.index === index ? { ...note, isChecked: !note.isChecked } : note
      )
    );
  }
  return (
    <div className={style.notes}>
      <ul>
        {updatedNotes.map((notes, index) => (
          <div key={index}>
            <li>
              <div
                className={`${style.note} ${notes.isChecked ? style.disabled : ""
                  }`}
                onClick={() => handleCheckClick(notes.note, notes.index)}
              >
                <img src={uncheck} alt="Uncheck" />
                {notes.isChecked && (
                  <img className={style.check} src={check} alt="Check" />
                )}
                <span>{notes.note}</span>
              </div>
              <div
                className={`${style.options} ${notes.isChecked ? style.options_disabled : ""
                  }`}
              >
                <img
                  onClick={() => handleEditClick(notes.note, index)}
                  src={edit}
                  alt="Edit Icon"
                />
                <img
                  onClick={() => handleDeleteClick(index)}
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
