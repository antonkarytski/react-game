import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import classesCss from './MenuButton.module.scss'

const MenuButton = ({className}) => {

    const classes = [classesCss.Menu]
    classes.push(className)

    return(
        <div className = {classes.join(" ")}><FontAwesomeIcon icon={faBars} /></div>
    )
}

export default MenuButton