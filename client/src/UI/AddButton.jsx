import React, { useContext } from "react";
import addBtn from "../assets/icons/addButton.svg";
import style from "./Button.module.css";

import { NoteContext } from "../context/NoteContext";

function Button(props) {
  const { setSelectedNote } = useContext(NoteContext);

  function handleAddButton() {
    setSelectedNote("");
    props.onOpen(true);
  }
  return (
    <button onClick={handleAddButton} className={style.addBtn}>
      <img src={addBtn} alt="Add Button" />
    </button>
  );
}

export default Button;
