import React, { useContext } from "react";
import style from "./Header.module.css";
import search_icon from "../../assets/icons/search.svg";
import { NoteContext } from "../../context/NoteContext";

function Header() {
  const { notes, setFilteredNotes } = useContext(NoteContext);

  function handleChange(event) {
    let filteredNotes = notes.filter((note) =>
      note.note.includes(event.target.value.toLowerCase())
    );
    setFilteredNotes(filteredNotes);
  }

  return (
    <>
      <div className={style.heading}>
        <span>TODO LIST</span>
      </div>
      <div className={style.search_box}>
        <input
          type="text"
          placeholder="Search Note.."
          onChange={handleChange}
          id={style.search}
        />
        <img src={search_icon} alt="Search" />
      </div>
    </>
  );
}
export default Header;
