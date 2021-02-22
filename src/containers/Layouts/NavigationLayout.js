import React from 'react'
import classes from './Layouts.module.scss'
import '../../styles/styles.scss'
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons'
import Button from "../../components/Navigation/Button";

const NavigationLayout = ({gameOnPause, onPauseToggle, loseGame}) => {

    return(
        <div className={classes.NavigationLayout}>
            <Button
                onClick = {loseGame ? null : onPauseToggle}
                className={classes.MenuButton}
                valueDefault = {faTimes}
                valueToggled = {faBars}
                faIcon = {true}
                toggled = {gameOnPause}
            />
        </div>
    )
}

export default NavigationLayout