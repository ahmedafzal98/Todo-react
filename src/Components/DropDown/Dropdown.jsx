import style from './DropDown.module.css'

function DropDown(prop) {
    return (
        <div className={style.drop_down_content}>
            <p>All</p>
            <p>Complete</p>
            <p>Incomplete</p>
        </div>
    )
}
export default DropDown