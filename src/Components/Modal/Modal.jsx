import { useContext, useState } from 'react'
import style from './Modal.module.css'

import {NoteContext} from '../../context/NoteContext'

const data = []

function Modal(props) {

    const [newNote, setNewNote] = useState("")
    const {setNotes} = useContext(NoteContext)


    function handleCancel() {
        props.isOpen(false)
    }
    function handleApply(note) {
        setNotes(prevNotes => [...prevNotes , newNote])
        setNewNote("")
    }
    function handleChange(event) {
        setNewNote(event.target.value)
    }

    return (
        <div className={style.overlay}>
            <div className={style.modal_container}>
                <span>NEW NOTE</span>
                <input type="text" placeholder="Search Note.." onChange={handleChange} value={newNote} id={style.add_note_input} />

                <div className={style.buttons}>
                    <button onClick={handleCancel} className={style.cancel_btn}>Cancel</button>
                    <button onClick={() => handleApply(newNote)} className={style.apply_btn}>Apply</button>
                </div>
            </div>
        </div>

    )
}

export default Modal