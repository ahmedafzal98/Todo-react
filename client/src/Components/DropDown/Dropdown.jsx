import { useContext } from "react";
import style from "./DropDown.module.css";
import { NoteContext } from "../../context/NoteContext";

function DropDown(prop) {
  const { setSelectedIndexDropdown } = useContext(NoteContext);

  return (
    <div className={style.dropdown_container}>
      <div className={style.drop_down_content}>
        {prop.data.map((item, index) => {
          return (
            <p onClick={() => setSelectedIndexDropdown(index)} key={index}>
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
}
export default DropDown;
