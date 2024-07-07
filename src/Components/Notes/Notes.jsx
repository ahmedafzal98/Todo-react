import style from "./Notes.module.css";
import uncheck from "../../assets/icons/Rectangle.svg";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/delete.svg";
import check from "../../assets/icons/check.svg";
import { useContext, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
import EmptyList from "../EmptyList/EmptyList";

function Notes(prop) {
  const {
    setNotes,
    setSelectedNote,
    notes,
    filteredNotes,
    setFilteredNotes,
    selectedNote,
  } = useContext(NoteContext);
  const [isCheck, setIsCheck] = useState(false);
  const [disabledIndex, setDisabledindex] = useState(-1);

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
    console.log({ selectedNote });
    setDisabledindex(index);
    setIsCheck(!isCheck);
    // setNotes(prevNotes =>
    //   prevNotes.map((note, i) =>
    //     i === index ? { ...note, isChecked: !note.isChecked } : note
    //   )
    // );
  }
  return (
    <div className={style.notes}>
      <ul>
        {updatedNotes.map((note, index) => (
          <div key={index}>
            <li>
              <div
                className={`${style.note} ${
                  index === disabledIndex && isCheck ? style.disabled : ""
                }`}
                onClick={() => handleCheckClick(note, index)}
              >
                <img src={uncheck} alt="Uncheck" />
                {isCheck && index === disabledIndex && (
                  <img className={style.check} src={check} alt="Check" />
                )}
                <span>{note}</span>
              </div>
              <div
                className={`${style.options} ${
                  isCheck ? style.options_disabled : ""
                }`}
              >
                <img
                  onClick={() => handleEditClick(note, index)}
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
