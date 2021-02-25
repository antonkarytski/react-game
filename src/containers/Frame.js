import React, {useEffect, useRef, useState} from 'react'
import Audio from "../components/Helpres/Audio";
import GameLayout from "./Layouts/GameLayout";
import NavigationLayout from "./Layouts/NavigationLayout";
import MenuLayout from "./Layouts/MenuLayout";

import classesCss from './Frame.module.scss'

import {gameHelper} from "../gameHelper";

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

    //Get saved values
    const savedSoundOn = Boolean(getSavedNumberVal("soundOn", 0))
    const savedBestScore = getSavedNumberVal("bestScore", 0)
    const savedSoundVolume = getSavedNumberVal("soundVolume", 50)
    const savedHeroIndex = getSavedNumberVal("hero", 0)
    const savedLocation = getSavedNumberVal("location", 0)

    if(savedLocation) gameHelper.setLocation(savedLocation)
    const environment = gameHelper.getEnvironment()

    const [gameOnPause, setGameOnPause] = useState(true)
    const [loseFlag, setLoseFlag] = useState(false)
    const [gameSet, setNextGameSet] = useState(1) //for refreshing game and save count of games
    const [bestGameScore, setBestGameScore] = useState(savedBestScore)
    const [soundOn, toggleSoundOn] = useState(savedSoundOn)
    const [soundVolume, setSoundVolume] = useState(savedSoundVolume)
    const [hero, setHero] = useState({item: gameHelper.getHero(savedHeroIndex), index: 0})
    const [location, setLocation] = useState(savedLocation)
    const gameFrame = useRef(null)

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

    function getMusic(selector){
        return gameFrame.current.querySelector(`audio#${selector}`)
    }

    function getSavedNumberVal(val, defaultVal){
        return Number(localStorage.getItem(val) || defaultVal)
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

        //Call here cause user have to do some action before music starts, so music starts after user press key for game start
        const bgMusic = getMusic("bg-music");
        bgMusic.play();
        setGameOnPause(!gameOnPause)
    }

    const resetGame = () => {
        if (loseFlag) setLoseFlag(false)
        setNextGameSet(gameSet + 1)
        setGameOnPause(false)
    }

    const heroSelectHandler = (index) => {
        setHero({
            item : gameHelper.getHero(index),
            index
        })
    }

    const locationSelectHandler = (index) => {
        gameHelper.setLocation(index)
        setLocation(index)
        heroSelectHandler(0)
    }

    const style = {
        height: settings.frameHeight,
        width: settings.frameWidth
    }

    useUnshiftKeyPress(keyActionsMap.SPACE, "SPACE")
    useUnshiftKeyPress(keyActionsMap.m, "m")

    useEffect(() => {
        localStorage.setItem("hero", hero.index+"")
    }, [hero])

    useEffect(() => {
        localStorage.setItem("location", location+"")
    }, [location])

    useEffect(() => {
        const bgMusic = getMusic("bg-music");
        bgMusic.muted = !soundOn;
        localStorage.setItem("soundOn", soundOn? "1" : "0")
    }, [soundOn])

    useEffect(() => {
        const bgMusic = getMusic("bg-music");
        bgMusic.volume = soundVolume/100;
        localStorage.setItem("soundVolume", soundVolume+"")
    }, [soundVolume])

    useEffect(() => {
        const bgMusic = getMusic("bg-music");
        bgMusic.muted = !soundOn;
        bgMusic.volume = soundVolume/100;
    }, [])

    return (
        <div className={classesCss.Wrap} ref={gameFrame}>
            <div className={classesCss.Border}/>
            <div className={classesCss.Frame} style={style}>
                <Audio
                    loop = {true}
                    id={"bg-music"}
                    src={environment.bgMusic}
                />
                <GameLayout
                    soundVolume={soundVolume}
                    soundOn={soundOn}
                    key={gameSet}
                    gameOnPause={gameOnPause}
                    onPauseToggle={onPauseToggle}
                    char={hero.item}
                    settings={settings}
                    location={environment}
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
                        currentLocation = {location}
                        locationSelectHandler = {locationSelectHandler}
                        locationSet = {gameHelper.locationSet}
                        currentHero = {hero.index}
                        heroSelectHandler = {heroSelectHandler}
                        heroes = {gameHelper.heroes}
                        soundInitValue = {savedSoundVolume}
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