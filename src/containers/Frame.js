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
    const savedSoundMuted = Boolean(getSavedNumberVal("soundMuted", 0))
    const savedSoundVolume = getSavedNumberVal("soundVolume", 50)
    const savedHeroIndex = getSavedNumberVal("hero", 0)
    const savedLocation = getSavedNumberVal("location", 0)


    const [hero, setHero] = useState({
        item: gameHelper.getHero(savedHeroIndex),
        index: savedHeroIndex
    })

    const [gameState, setGameState] = useState({
        pause: true,
        lose: false,
        set: 1,
        //scoreSet:
    })

    const [soundState, setSoundState] = useState({
        muted: savedSoundMuted,
        volume: savedSoundVolume
    })

    const [locationData, setLocationData] = useState({
        index: savedLocation,
        setLocationNotForUse: gameHelper.setLocation(savedLocation),
        heroes: gameHelper.heroes,
        environment: gameHelper.environment,
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

    function updateScoreSet(){

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
            muted: soundVolume <= 0
        })
    }


    const onSoundToggle = () => {
        setSoundState({
            //if turn on sound when volume = 0, set volume = 10(0.1)
            volume: soundState.muted && soundState.volume <= 0 ? 10 : soundState.volume,
            muted: !soundState.muted
        })
    }

    const onPauseToggle = (flag = false, score = 0) => {

        if (score > getSavedNumberVal("bestScore", 0)) {
            localStorage.setItem("bestScore", score + "")
        }
        const scoreHistory = localStorage.getItem("scoreHistory")
        if(scoreHistory){
            const scoreHistorySet = scoreHistory.split(",")
            if(scoreHistorySet.length >= 10) scoreHistorySet.splice(9,1)
            scoreHistorySet.splice(0,0,score+"");
            localStorage.setItem("scoreHistory", scoreHistorySet.join(","))
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
        setGameState({
            lose: gameState.lose,
            pause: gameState.pause,
            set: gameState.set + 1
        })
    }

    useUnshiftKeyPress(keyActionsMap.SPACE, "SPACE")
    useUnshiftKeyPress(keyActionsMap.m, "m")

    useEffect(() => {
        localStorage.setItem("hero", hero.index + "")
    }, [hero])

    useEffect(() => {
        if (locationData.environment.bgMusic) {
            const bgMusic = getMusic("bg-music");
            if (!bgMusic.paused) {
                bgMusic.pause();
            }
            bgMusic.load();
            bgMusic.muted = soundState.muted;
            bgMusic.volume = soundState.volume / 100 * 0.7;
        }
        localStorage.setItem("location", locationData.index + "")
    }, [locationData.index])

    useEffect(() => {
        if (locationData.environment.bgMusic) {
            const bgMusic = getMusic("bg-music");
            bgMusic.muted = soundState.muted;
        }
        localStorage.setItem("soundMuted", soundState.muted ? "1" : "0")
    }, [soundState.muted])

    useEffect(() => {
        if (locationData.environment.bgMusic) {
            const bgMusic = getMusic("bg-music");
            bgMusic.volume = soundState.volume / 100 * 0.7;
        }
        localStorage.setItem("soundVolume", soundState.volume + "")
    }, [soundState.volume])

    useEffect(() => {
        if (locationData.bgMusic) {
            const bgMusic = getMusic("bg-music");
            bgMusic.muted = soundState.muted;
            bgMusic.volume = soundState.volume / 100 * 0.7;
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
                {locationData.environment.bgMusic?
                <Audio
                    loop={true}
                    id={"bg-music"}
                    src={locationData.environment.bgMusic}
                />
                : null}
                <GameLayout
                    soundVolume={soundState.volume}
                    soundMuted={soundState.muted}
                    key={gameState.set}
                    gameOnPause={gameState.pause}
                    onPauseToggle={onPauseToggle}
                    char={hero.item}
                    settings={settings}
                    environment={locationData.environment}
                    bestScore={getSavedNumberVal("bestScore", 0)}
                />
                <NavigationLayout
                    gameState={gameState}
                    onPauseToggle={onPauseToggle}
                    soundMuted={soundState.muted}
                    onSoundToggle={onSoundToggle}
                />
                {gameState.pause ?
                    <MenuLayout
                        locationData={{
                            itemSet: gameHelper.locationSet,
                            currentIndex: locationData.index,
                            selectHandler: locationSelectHandler,
                        }}

                        heroData={{
                            itemSet: locationData.heroes,
                            currentIndex: hero.index,
                            selectHandler: heroSelectHandler,
                        }}

                        sound={{
                            initValue: savedSoundVolume,
                            muted: soundState.muted,
                            onSoundToggle,
                            onSoundVolumeChange
                        }}

                        game={{
                            state : gameState,
                            onResetGame : resetGame,
                            onPauseToggle
                        }}
                    />
                    : null}
            </div>
            <div className={classesCss.Border}/>
        </div>
    )
}

export default Frame