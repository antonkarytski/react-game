import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons'
import classesCss from './Buttons/Buttons.module.scss'

const MenuButton = ({className, onPauseToggle}) => {

    const [menuOpened, setMenuOpened] = useState(false)

    const classes = [classesCss.Menu]
    classes.push(className)

    const onClickHandler = () => {
        onPauseToggle();
        setMenuOpened(!menuOpened)
    }


    return(
        <div
            onClick={() => onClickHandler()}
            className = {classes.join(" ")}>
            <FontAwesomeIcon icon={menuOpened? faTimes : faBars} />
        </div>
    )
}

export default MenuButton