import React from 'react'
import addBtn from '../assets/icons/addButton.svg'
import style from './Button.module.css'

function Button(props) {

    function handleAddButton() {
        props.onOpen(true)
    }
    return (
        <button onClick={handleAddButton} className={style.addBtn}>
            <img src={addBtn} alt="Add Button" srcset="" />
        </button>
    )
}

export default Button