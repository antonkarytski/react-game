import React, {useState} from 'react'
import './styles/style.scss'
import classesCss from './styles/Layouts.module.scss'
import Button from "../../components/Navigation/Buttons/Button";
import ResetButton from "../../components/Navigation/Buttons/ResetButton";
import SoundRangeSlider from "../../components/Navigation/RangeSlider/SoundRangeSlider";
import StatisticMenu from "../../components/Navigation/Menu/StatisticMenu"
import PickMenu from "../../components/Navigation/Menu/PickMenu";
import {faPlay} from '@fortawesome/free-solid-svg-icons';

function MenuLayout(props) {

    const {
        mode,
        onResetGame,
        onPauseToggle,
        soundInitValue,
        onSoundVolumeChange,
        onSoundToggle,
        soundOn,
        heroes,
        heroSelectHandler,
        currentHero,
        locationSet,
        locationSelectHandler,
        currentLocation} = props

    const [menuMode, setMenuState] = useState('init') //init, start, heroSelect, locationSelect, lose, pause

    let currentColonContent = null;
    let menuContent = null;
    const resetClasses = [classesCss.BigButton, classesCss.ResetButton].join(" ")


    switch (menuMode) {
        case "init":
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
            menuContent =
                <div className={classesCss.MenuContent}>
                    {currentColonContent}
                    <div className={classesCss.SettingColumn}>
                        <SoundRangeSlider
                            initValue={soundInitValue}
                            onSoundToggle={onSoundToggle}
                            soundOn={soundOn}
                            onChange={onSoundVolumeChange}
                        />
                        <Button
                            onClick={() => setMenuState("heroSelect")}
                            className={classesCss.SelectButton}
                            valueDefault={"SELECT HERO"}
                        />
                        <Button
                            style={{fontSize: "15px"}}
                            onClick={() => setMenuState("locationSelect")}
                            className={classesCss.SelectButton}
                            valueDefault={"SELECT LOCATION"}
                        />
                        <Button
                            onClick={() => setMenuState("statistic")}
                            className={classesCss.SelectButton}
                            valueDefault={"STATISTIC"}
                        />
                    </div>
                </div>
            break
        case "heroSelect":
            menuContent =
                <PickMenu
                    itemClasses={"hero"}
                    currentItem={currentHero}
                    pickItemHandler={heroSelectHandler}
                    itemSet={heroes}
                    onBackHandler={() => setMenuState("init")}
                    previewType={"card"}
                />
            break
        case "locationSelect":
            menuContent =
                <PickMenu
                    itemClasses={"location"}
                    currentItem={currentLocation}
                    pickItemHandler={locationSelectHandler}
                    itemSet={locationSet}
                    onBackHandler={() => setMenuState("init")}
                    previewType={"full"}
                />
            break
        case "statistic":
            menuContent =
                <StatisticMenu
                    onBack={() => setMenuState("init")}
                />
            break
        default:
            currentColonContent = null

    }

    return (
        <div className={classesCss.MenuLayout}>
            {menuContent}
        </div>
    )
}

export default MenuLayout