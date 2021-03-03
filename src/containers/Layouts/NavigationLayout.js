import React from 'react'
import classes from './styles/Layouts.module.scss'
import '../../styles/styles.scss'
import {faBars, faCompressArrowsAlt, faExpandArrowsAlt, faQuestion, faTimes} from '@fortawesome/free-solid-svg-icons'
import Button from "../../components/Navigation/Buttons/Button";
import SoundButton from "../../components/Navigation/Buttons/SoundButton";
import Counter from "../../components/Navigation/Counter/Counter";

const NavigationLayout = (props) => {

    const {
        gameState,
        onPauseToggle,
        onSoundToggle,
        soundMuted,
        fullScreen,
        fullScreenToggle,
        infoMenuToggle,
        bestScore,
        counterId
    } = props

    return (

        <div className={classes.NavigationLayout}>
            <Button
                onClick={onPauseToggle}
                className={classes.MenuButton}
                valueDefault={faTimes}
                valueToggled={faBars}
                faIcon={true}
                toggled={gameState.pause}
                condition={!gameState.lose}
            />
            <SoundButton
                onSoundToggle={onSoundToggle}
                className={[classes.MenuButton, classes.VolumeButton].join(" ")}
                soundMuted={soundMuted}
            />

            <Counter
                className={"counter"}
                bestScore={bestScore}
                startTime={gameState.gameStartTime}
                condition={gameState.pause}
                id = {counterId}
            />

            <Button
                onClick={infoMenuToggle}
                className={[classes.MenuButton, classes.QuestionButton].join(" ")}
                valueDefault={faQuestion}
                valueToggled={faTimes}
                faIcon={true}
                toggled={!gameState.infoMenuOpened}
            />

            <Button
                onClick={fullScreenToggle}
                className={[classes.MenuButton, classes.FullScreenButton].join(" ")}
                valueDefault={faExpandArrowsAlt}
                valueToggled={faCompressArrowsAlt}
                faIcon={true}
                toggled={!fullScreen}
            />
        </div>
    )
}

export default NavigationLayout