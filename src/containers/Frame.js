import React, {useEffect, useRef, useState} from 'react'
import Audio from "../components/Helpres/Audio";
import GameLayout from "./Layouts/GameLayout";
import NavigationLayout from "./Layouts/NavigationLayout";
import MenuLayout from "./Layouts/MenuLayout";

import classesCss from './Frame.module.scss'

import {getHero, getLocation} from "../gameHelper";

import useUnshiftKeyPress from "../hooks/useUnshiftKeyPress";


/*

STRUCTURE:
Navigation Layout:
 - Counter
 - Game-Over-Window + retry button + change char Button
 - Skills indicators
 - Char Selection
 - Start Button

 GameLayout
 - Chars
 - Obstacles
 - Skills Effects

 */

const Frame = ({settings}) => {

    let parsedSoundOn = localStorage.getItem("soundOn") || true
    if(parsedSoundOn === "false") parsedSoundOn = false
    let parsedBestScore = Number(localStorage.getItem("bestScore") || 0)
    let parsedSoundVolume = Number(localStorage.getItem("soundVolume") || 50)

    const [gameOnPause, setGameOnPause] = useState(true)
    const [loseFlag, setLoseFlag] = useState(false)
    const [gameSet, setNextGameSet] = useState(1)
    const [bestGameScore, setBestGameScore] = useState(parsedBestScore)
    const [soundOn, toggleSoundOn] = useState(parsedSoundOn)
    const [soundVolume, setSoundVolume] = useState(parsedSoundVolume)
    const gameFrame = useRef(null)

    const location = getLocation()
    const char = getHero("soldier");

    const keyActionsMap = {
        SPACE: () => {
            if (!loseFlag) {
                onPauseToggle()
            } else {
                resetGame()
            }
        },
        m : () => {
            onSoundToggle()
        }
    }

    const onSoundVolumeChange = (soundVolume) => {
        setSoundVolume(soundVolume);
        if(soundVolume <= 0) toggleSoundOn(false)
        else if(soundVolume > 0 && soundOn === false) toggleSoundOn(true)
    }

    const onSoundToggle = () => {
        toggleSoundOn(!soundOn);
    }

    const onPauseToggle = (flag = false, score = 0) => {
        if (flag) {
            setLoseFlag(true)
            if (score > bestGameScore) {
                setBestGameScore(score)
                localStorage.setItem("bestScore", score+"")
            }
        }
        const bgMusic = gameFrame.current.querySelector("audio#bg-music")
        bgMusic.play();
        setGameOnPause(!gameOnPause)
    }

    const resetGame = () => {
        if (loseFlag) setLoseFlag(false)
        setNextGameSet(gameSet + 1)
        setGameOnPause(false)
    }

    const style = {
        height: settings.frameHeight,
        width: settings.frameWidth
    }

    useUnshiftKeyPress(keyActionsMap.SPACE, "SPACE")
    useUnshiftKeyPress(keyActionsMap.m, "m")

    useEffect(() => {
        const bgMusic = gameFrame.current.querySelector("audio#bg-music")
        bgMusic.muted = !soundOn;
        localStorage.setItem("soundOn", soundOn? "true" : "false")
    }, [soundOn])

    useEffect(() => {
        const bgMusic = gameFrame.current.querySelector("audio#bg-music")
        bgMusic.volume = soundVolume/100;
        localStorage.setItem("soundVolume", soundVolume+"")
    }, [soundVolume])

    useEffect(() => {
        const bgMusic = gameFrame.current.querySelector("audio#bg-music")
        bgMusic.muted = !soundOn;
        bgMusic.volume = soundVolume/100;
    }, [])

    return (
        <div className={classesCss.Wrap} ref={gameFrame}>
            <div className={classesCss.Border}/>
            <div className={classesCss.Frame} style={style}>
                <Audio
                    id={"bg-music"}
                    src={location.bgMusic}
                />
                <GameLayout
                    key={gameSet}
                    gameOnPause={gameOnPause}
                    onPauseToggle={onPauseToggle}
                    char={char}
                    settings={settings}
                    location={location}
                    bestScore={bestGameScore}
                />
                <NavigationLayout
                    gameOnPause={gameOnPause}
                    onPauseToggle={onPauseToggle}
                    soundOn={soundOn}
                    onSoundToggle={onSoundToggle}
                    loseGame={loseFlag}
                />
                {gameOnPause ?
                    <MenuLayout
                        soundInitValue = {parsedSoundVolume}
                        soundOn={soundOn}
                        onSoundToggle={onSoundToggle}
                        onSoundVolumeChange={onSoundVolumeChange}
                        onResetGame={resetGame}
                        onPauseToggle={onPauseToggle}
                        mode={loseFlag ? "lose" : "pause"}
                    />
                    : null}

            </div>
            <div className={classesCss.Border}/>
        </div>
    )
}

export default Frame