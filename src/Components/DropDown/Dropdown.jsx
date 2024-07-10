import { useContext } from 'react'
import style from './DropDown.module.css'
import { NoteContext } from '../../context/NoteContext'

function DropDown() {
    const { notes, setNotesToRender, setNotes } = useContext(NoteContext)

    const select = ["All", "Complete", "Incomplete"]

    function NotesToRender(index) {
        let notesToRender = []
        if (index === 0) {

            notesToRender = notes
        } else if (index === 1) {

            notesToRender = notes.filter(note => note.isChecked);
        } else {
            notesToRender = notes.filter(note => !note.isChecked);

        }

        setNotesToRender(notesToRender)
        console.log(notesToRender);
    }

    return (
        <div className={style.dropdown_container}>

            <div className={style.drop_down_content}>
                {select.map((item, index) => {
                    return <p onClick={() => NotesToRender(index)} key={index}>{item}</p>
                })}

            </div>
        </div>
    )
}
export default DropDown