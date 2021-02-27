import React from 'react'
import classes from './styles/Layouts.module.scss'
import '../../styles/styles.scss'
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons'
import Button from "../../components/Navigation/Buttons/Button";
import SoundButton from "../../components/Navigation/Buttons/SoundButton";

const NavigationLayout = ({gameState, onPauseToggle, onSoundToggle, soundMuted}) => {

    return(
        <>
        <div className={classes.NavigationLayout}>
            <Button
                onClick = {onPauseToggle}
                className={classes.MenuButton}
                valueDefault = {faTimes}
                valueToggled = {faBars}
                faIcon = {true}
                toggled = {gameState.pause}
                condition = {!gameState.lose}
            />
            <SoundButton
                onSoundToggle = {onSoundToggle}
                className={[classes.MenuButton, classes.VolumeButton].join(" ")}
                soundMuted = {soundMuted}
            />
        </div>
        </>
    )
}

export default NavigationLayout