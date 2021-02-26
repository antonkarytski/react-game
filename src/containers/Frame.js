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
    const savedSoundVolume = getSavedNumberVal("soundVolume", 50)
    const savedHeroIndex = getSavedNumberVal("hero", 0)
    const savedLocation = getSavedNumberVal("location", 0)

    if (savedLocation) gameHelper.setLocation(savedLocation)

    const [hero, setHero] = useState({
        item: gameHelper.getHero(savedHeroIndex),
        index: savedHeroIndex
    })

    const [gameState, setGameState] = useState({
        pause: true,
        lose: false,
        set: 1,
    })

    const [soundState, setSoundState] = useState({
        on: savedSoundOn,
        volume: savedSoundVolume
    })

    const [locationData, setLocationData] = useState({
        index: savedLocation,
        heroes: gameHelper.heroes,
        environment: gameHelper.getEnvironment()
    })

    const gameFrame = useRef(null)

    const keyActionsMap = {
        SPACE: () => {
            if (!gameState.lose) {
                onPauseToggle()
            } else {
                resetGame()
            }
        },
        m: () => {
            onSoundToggle()
        }
    }


    function getSavedNumberVal(val, defaultVal) {
        return Number(localStorage.getItem(val) || defaultVal)
    }

    function getMusic(selector) {
        return gameFrame.current.querySelector(`audio#${selector}`)
    }

    const onSoundVolumeChange = (soundVolume) => {
        setSoundState({
            volume: soundVolume,
            on: soundVolume > 0
        })
    }


    const onSoundToggle = () => {
        setSoundState({
            //if turn on sound when volume = 0, set volume = 10(0.1)
            volume: !soundState.on && soundState.volume <= 0 ? 10 : soundState.volume,
            on: !soundState.on
        })
    }

    const onPauseToggle = (flag = false, score = 0) => {

        if (score > getSavedNumberVal("bestScore", 0)) {
            localStorage.setItem("bestScore", score + "")
        }

        setGameState({
            lose: flag,
            pause: !gameState.pause,
            set: gameState.set,
        })

        //Call here cause user have to do some action before music starts, so music starts after user press key for game start
        if (locationData.environment.bgMusic) {
            const bgMusic = getMusic("bg-music")
            if (bgMusic.paused) bgMusic.play();
        }
    }

    const resetGame = () => {
        setGameState({
            lose: gameState.lose ? false : gameState.lose,
            pause: false,
            set: gameState.set + 1
        })
    }

    const heroSelectHandler = (index) => {
        setHero({
            item: gameHelper.getHero(index),
            index
        })
    }

    const locationSelectHandler = (index) => {
        gameHelper.setLocation(index)
        setLocationData({
            index: index,
            heroes: gameHelper.heroes,
            environment: gameHelper.getEnvironment()
        })
        heroSelectHandler(0)
    }


    useUnshiftKeyPress(keyActionsMap.SPACE, "SPACE")
    useUnshiftKeyPress(keyActionsMap.m, "m")

    useEffect(() => {
        localStorage.setItem("hero", hero.index + "")
    }, [hero])

    useEffect(() => {
        const bgMusic = getMusic("bg-music");
        bgMusic.muted = !soundState.on;
        bgMusic.volume = soundState.volume / 100;
        localStorage.setItem("location", locationData.index + "")
    }, [locationData.index])

    useEffect(() => {
        if(locationData.environment.bgMusic){
            const bgMusic = getMusic("bg-music");
            bgMusic.muted = !soundState.on;
        }
        localStorage.setItem("soundOn", soundState.on ? "1" : "0")
    }, [soundState.on])

    useEffect(() => {
        if(locationData.environment.bgMusic){
            const bgMusic = getMusic("bg-music");
            bgMusic.volume = soundState.volume / 100;
        }
        localStorage.setItem("soundVolume", soundState.volume + "")
    }, [soundState.volume])

    useEffect(() => {
        if(locationData.bgMusic){
            const bgMusic = getMusic("bg-music");
            bgMusic.muted = !soundState.on;
            bgMusic.volume = soundState.volume / 100;
        }
    }, [])

    const style = {
        height: settings.frameHeight,
        width: settings.frameWidth
    }

    return (
        <div className={classesCss.Wrap} ref={gameFrame}>
            <div className={classesCss.Border}/>
            <div className={classesCss.Frame} style={style}>
                <Audio
                    loop={true}
                    id={"bg-music"}
                    src={locationData.environment.bgMusic}
                />
                <GameLayout
                    soundVolume={soundState.volume}
                    soundOn={soundState.on}
                    key={gameState.set}
                    gameOnPause={gameState.pause}
                    onPauseToggle={onPauseToggle}
                    char={hero.item}
                    settings={settings}
                    location={locationData.environment}
                    bestScore={getSavedNumberVal("bestScore", 0)}
                />
                <NavigationLayout
                    gameOnPause={gameState.pause}
                    loseGame={gameState.lose}
                    onPauseToggle={onPauseToggle}
                    soundOn={soundState.on}
                    onSoundToggle={onSoundToggle}
                />
                {gameState.pause ?
                    <MenuLayout
                        currentLocation={locationData.index}
                        locationSelectHandler={locationSelectHandler}
                        locationSet={gameHelper.locationSet}
                        currentHero={hero.index}
                        heroSelectHandler={heroSelectHandler}
                        heroes={locationData.heroes} //
                        soundInitValue={savedSoundVolume} //
                        soundOn={soundState.on} //
                        onSoundToggle={onSoundToggle} //
                        onSoundVolumeChange={onSoundVolumeChange}
                        onResetGame={resetGame}
                        onPauseToggle={onPauseToggle} //
                        mode={gameState.lose ? "lose" : "pause"} //
                    />
                    : null}
            </div>
            <div className={classesCss.Border}/>
        </div>
    )
}

export default Frame