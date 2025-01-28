import empty_logo from '../../assets/icons/Detective-check-footprint 1.png'
import style from './EmptyList.module.css'

function EmptyList() {
    return (
        <div className={style.note_list}>
            <img src={empty_logo} alt="Empty Logo" />
            <span>Empty..</span>
        </div>
    )
}
export default EmptyList