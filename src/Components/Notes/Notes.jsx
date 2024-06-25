import style from './Notes.module.css'
import uncheck from '../../assets/icons/Rectangle.svg'
import edit from '../../assets/icons/edit.svg'
import trash from '../../assets/icons/delete.svg'
import check from '../../assets/icons/check.svg'
import { useContext } from 'react'
import { NoteContext } from '../../context/NoteContext'

function Notes() {

    // const notes = ["note1", "note2", "note3"]
    const { notes } = useContext(NoteContext)

    console.log(notes);

    return (
        <div className={style.notes}>
            <ul>
                {notes.map((note) => {

                    return (
                        <>
                            <li>
                                <div className={style.note}>

                                    <img src={uncheck} alt="Uncheck" />
                                    <img className={style.check} src={check} alt="Check" />
                                    <span>{note}</span>
                                </div>
                                <div className={style.options}>
                                    <img src={edit} alt="" />
                                    <img src={trash} alt="" />
                                </div>
                            </li>
                            <hr />
                        </>
                    )
                })}

            </ul>
        </div>
    )
}
export default Notes