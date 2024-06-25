import React from "react";
import style from "./Header.module.css"
import search_icon from "../../assets/icons/search.svg"

function Header() {
    return (
        <>
            <div className={style.heading}>
                <span>TODO LIST</span>
            </div>
            <div className={style.search_box}>
                <input type="text" placeholder="Search Note.." id={style.search} />
                <img src={search_icon} alt="Search" />
            </div>
        </>
    )
}
export default Header