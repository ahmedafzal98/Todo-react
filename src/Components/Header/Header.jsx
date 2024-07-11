import React, { useContext, useState } from "react";
import style from "./Header.module.css";
import search_icon from "../../assets/icons/search.svg";
import { NoteContext } from "../../context/NoteContext";
import moon from '../../assets/icons/Moon.svg'
import DropDown from "../DropDown/Dropdown";
import chevron_top from '../../assets/icons/chevron-top.svg'
import chevron_down from '../../assets/icons/chevron-down.svg'

function Header() {
  const { notes, setFilteredNotes, setSearchInputValue, searchInputValue, selectedIndexDropdown } = useContext(NoteContext);
  const [isSelectClick, setIsSelectClick] = useState(false)

  function handleChange(event) {
    let filteredNotes = notes.filter((note) =>
      note.note.includes(event.target.value.toLowerCase())
    );
    setFilteredNotes(filteredNotes);
    setSearchInputValue(event.target.value)
  }


  const select = ["All", "Complete", "Incomplete"]

  return (
    <>
      <div className={style.heading}>
        <span>TODO LIST</span>
      </div>
      <div className={style.header}>
        <div className={style.search_box}>
          <input
            type="text"
            placeholder="Search Note.."
            onChange={handleChange}
            value={searchInputValue || ""}
            id={style.search}
          />
          <img src={search_icon} alt="Search" />
        </div>

        <div className={style.dropdown_container}>

          <div onClick={() => setIsSelectClick(!isSelectClick)} className={style.select}>
            <p>{select[selectedIndexDropdown]}</p>
            <img src={isSelectClick ? chevron_down : chevron_top} alt="DropDown Icon" />
          </div>
          {isSelectClick && <DropDown data={select} />}
        </div>
        <div className={style.color_schema}>
          <img src={moon} alt="DropDown Icon" />
        </div>
      </div >
    </>
  );
}
export default Header;
