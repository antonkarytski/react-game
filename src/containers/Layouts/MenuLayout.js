import React from 'react'
import classesCss from './styles/Layouts.module.scss'
import Button from "../../components/Navigation/Buttons/Button";
import ResetButton from "../../components/Navigation/Buttons/ResetButton";
import SoundRangeSlider from "../../components/Navigation/RangeSlider/SoundRangeSlider";
import {faPlay} from '@fortawesome/free-solid-svg-icons';

function MenuLayout({mode, onResetGame, onPauseToggle, onSoundVolumeChange, soundOn, onSoundToggle, soundInitValue}) {

    let currentColonContent = null;
    const resetClasses = [classesCss.BigButton, classesCss.ResetButton].join(" ")
    if (mode === "lose") {
        currentColonContent =
            <div className={[classesCss.CurrentColumn, classesCss.LoseMessage].join(' ')}>
                <h2>YOU LOSE</h2>
                <ResetButton
                    onResetGame={onResetGame}
                    className={resetClasses}
                />
                <span>or press <i>SPACE</i></span>
            </div>

    } else if (mode === "pause") {
        currentColonContent =
            <div className={classesCss.CurrentColumn}>
                <ResetButton
                    onResetGame={onResetGame}
                    className={resetClasses}
                />
                <Button
                    onClick={() => onPauseToggle()}
                    className={classesCss.BigButton}
                    valueDefault={faPlay}
                    faIcon={true}
                />
            </div>
    }

    return (
        <div className={classesCss.MenuLayout}>
            <div className={classesCss.MenuContent}>
                {currentColonContent}
                <div className={classesCss.SettingColumn}>
                    <SoundRangeSlider
                        initValue = {soundInitValue}
                        onSoundToggle = {onSoundToggle}
                        soundOn = {soundOn}
                        onChange = {onSoundVolumeChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default MenuLayout