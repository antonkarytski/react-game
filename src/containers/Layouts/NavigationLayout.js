import React from 'react'
import classes from './styles/Layouts.module.scss'
import '../../styles/styles.scss'
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons'
import Button from "../../components/Navigation/Buttons/Button";
import SoundButton from "../../components/Navigation/Buttons/SoundButton";

const NavigationLayout = ({loseGame, gameOnPause, onPauseToggle, onSoundToggle, soundOn}) => {

    return(
        <>
        <div className={classes.NavigationLayout}>
            <Button
                onClick = {onPauseToggle}
                className={classes.MenuButton}
                valueDefault = {faTimes}
                valueToggled = {faBars}
                faIcon = {true}
                toggled = {gameOnPause}
                condition = {!loseGame}
            />
            <SoundButton
                onSoundToggle = {onSoundToggle}
                className={[classes.MenuButton, classes.VolumeButton].join(" ")}
                soundOn = {soundOn}
            />
        </div>
        </>
    )
}

export default NavigationLayout