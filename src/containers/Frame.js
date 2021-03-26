import React, { useEffect, useRef, useState } from "react"
import Audio from "../components/Helpres/Audio"
import GameLayout from "./Layouts/GameLayout"
import NavigationLayout from "./Layouts/NavigationLayout"
import MenuLayout from "./Layouts/MenuLayout"
import classesCss from "./Frame.module.scss"
import useUnshiftKeyPress from "../hooks/useUnshiftKeyPress"
import { useParams } from "react-router"

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

const Frame = ({gameHelper, windowSize}) => {

    //
    //Init saved in local storage values
    //

    const savedSoundMuted = !!getSavedNumberVal("soundMuted", 0)
    const savedSoundVolume = getSavedNumberVal("soundVolume", 50)
    const savedGameDifficult = getSavedNumberVal("gameDifficult", 2)

    const {game} = useParams()

    let initLocation
    let savedHeroIndex

    if(game && gameHelper.findLocation(game) > -1){
        initLocation = game
        savedHeroIndex = 0
    } else {
        initLocation = parseLocation(gameHelper.settings.defaultLocation)
        savedHeroIndex = getSavedNumberVal("hero", 0)
    }


    //
    //Init hooks vars
    //

    const [gameState, setGameState] = useState({
        pause: true,
        lose: false,
        set: 1,
        init: true,
        infoMenuOpened: false,
        gameStartTime: new Date(),
        difficult: savedGameDifficult
    })

    const [hero, setHero] = useState({
        item: gameHelper.getHero(savedHeroIndex),
        index: savedHeroIndex
    })

    const [soundState, setSoundState] = useState({
        muted: savedSoundMuted,
        volume: savedSoundVolume
    })

    if (gameState.init && gameHelper.currenLocationIndex !== initLocation) {
        gameHelper.setLocation(initLocation)
    }

    const [locationData, setLocationData] = useState({
        index: initLocation,
        heroes: gameHelper.heroes,
        environment: gameHelper.environment,
    })

    const [fullScreenState, setFullScreenState] = useState(false)

    const gameFrame = useRef(null)

    const keyActionsMap = {
        SPACE: () => {
            if (!gameState.lose) {
                pauseToggleHandler()
            } else {
                resetGame()
            }
        },
        m: () => {
            soundMutedToggleHandler()
        }
    }

    //
    //Handlers
    //


    function parseLocation(defaultVal){
       const savedLocation = localStorage.getItem("location") ?? defaultVal
        if(!isNaN(Number(savedLocation))) return Number(savedLocation)
        return savedLocation
    }

    function includeScoreSet(currentScoreString, score){
        if (currentScoreString) {
            const scoreHistorySet = currentScoreString.split(",")
            if (scoreHistorySet.length >= 10) scoreHistorySet.splice(9, 1)
            scoreHistorySet.splice(0, 0, score + "");
            return scoreHistorySet.join(",")
        }
        return score + ""
    }

    function updateGameState(newState) {
        setGameState(Object.assign({}, gameState, newState))
    }

    function getSavedNumberVal(val, defaultVal) {
        return Number(localStorage.getItem(val) || defaultVal)
    }


    function getMusic(selector) {
        return gameFrame.current.querySelector(`audio#${selector}`)
    }

    function getScore(){
        return gameFrame.current.querySelector("#score-counter").dataset.score
    }

    const soundVolumeChangeHandler = (soundVolume) => {
        setSoundState({
            volume: soundVolume,
            muted: soundVolume <= 0
        })
    }

    const soundMutedToggleHandler = () => {
        setSoundState({
            //if turn on sound when volume = 0, set volume = 10(0.1)
            volume: soundState.muted && soundState.volume <= 0 ? 10 : soundState.volume,
            muted: !soundState.muted
        })
    }

    const gameDifficultChangeHandler = (value) => {
        updateGameState({
            difficult: value
        })
        localStorage.setItem("gameDifficult", value)
    }


    const pauseToggleHandler = (flag = false) => {
        const score = getScore();

        if (score > getSavedNumberVal("bestScore", 0)) {
            localStorage.setItem("bestScore", score + "")
        }

        if(flag === "lose"){
            const newScoreString = includeScoreSet(localStorage.getItem("scoreHistory"), score)
            localStorage.setItem("scoreHistory", newScoreString)
        }

        updateGameState({
            lose: flag === "lose",
            pause: !gameState.pause,
            set: gameState.set,
            init: false,
            infoMenuOpened: false
        })

        //Call here cause user have to do some action before music starts, so music starts
        // after user press key for game start
        if (locationData.environment.bgMusic) {
            const bgMusic = getMusic("bg-music")
            if (bgMusic.paused) bgMusic.play();
        }
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
        updateGameState({
            lose: gameState.lose,
            pause: gameState.pause,
            set: gameState.set + 1,
            init: false,
            infoMenuOpened: false
        })
    }

    const fullScreenHandler = () => {

        function launchFullScreen(element) {
            if(element.requestFullScreen) {
                element.requestFullScreen();
            } else if(element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if(element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            }
        }

        function cancelFullscreen() {
            if(document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if(document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
        if(fullScreenState){
            cancelFullscreen()
        } else {
            launchFullScreen(gameFrame.current)
        }
        setFullScreenState(!fullScreenState)
    }

    function infoMenuHandler(){
        const stateToUpd = {
            infoMenuOpened: !gameState.infoMenuOpened
        }
        if(!gameState.infoMenuOpened){
            stateToUpd.menuWasPaused = gameState.pause
            stateToUpd.pause = true
        } else {
            stateToUpd.pause = gameState.menuWasPaused
        }
        updateGameState(stateToUpd)
    }

    const resetGame = () => {
        updateGameState({
            lose: gameState.lose ? false : gameState.lose,
            pause: false,
            set: gameState.set + 1,
            gameStartTime: new Date()
        })
    }

    //
    //Hooks
    //

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

    //
    //Styles and props prepare
    //

    if(windowSize.width < gameHelper.settings.defaultFrameWidth){
        gameHelper.settings.frameWidth = windowSize.width
        gameHelper.settings.frameBorder = false
    } else {
        gameHelper.settings.frameWidth = gameHelper.settings.defaultFrameWidth
        gameHelper.settings.frameBorder = true
    }

    if(windowSize.width < windowSize.height){
        gameHelper.settings.frameHeight = windowSize.height
        gameHelper.settings.frameBorder = false
    } else if(windowSize.height < gameHelper.settings.defaultFrameHeight){
        gameHelper.settings.frameHeight = windowSize.height
        gameHelper.settings.frameBorder = false
    } else {
        gameHelper.settings.frameHeight = gameHelper.settings.defaultFrameHeight
        gameHelper.settings.frameBorder = true
    }

    const style = {
        height: gameHelper.settings.frameHeight,
        width: gameHelper.settings.frameWidth
    }
    if (gameHelper.settings.frameBorder) style.border = "1px solid black"

    return (
        <div className={classesCss.Wrap} ref={gameFrame}>
            {gameHelper.settings.frameBorder ? <div className={classesCss.Border}/> : null}
            <div className={classesCss.Frame} style={style}>
                {locationData.environment.bgMusic ?
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
                    difficult = {gameState.difficult}
                    gameOnPause={gameState.pause}
                    onPauseToggle={pauseToggleHandler}
                    char={hero.item}
                    gameHelper={gameHelper}
                    environment={locationData.environment}
                />
                <NavigationLayout
                    counterId = {"score-counter"}
                    bestScore={getSavedNumberVal("bestScore", 0)}
                    fullScreen={fullScreenState}
                    fullScreenToggle={fullScreenHandler}
                    gameState={gameState}
                    onPauseToggle={pauseToggleHandler}
                    soundMuted={soundState.muted}
                    onSoundToggle={soundMutedToggleHandler}
                    infoMenuToggle={infoMenuHandler}
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

                        statistic={{
                            scoreHistory : localStorage.getItem("scoreHistory"),
                            bestScore : getSavedNumberVal("bestScore", 0)
                        }}

                        sound={{
                            initValue: savedSoundVolume,
                            muted: soundState.muted,
                            onSoundToggle: soundMutedToggleHandler,
                            onSoundVolumeChange: soundVolumeChangeHandler
                        }}

                        game={{
                            state: gameState,
                            onResetGame: resetGame,
                            onPauseToggle: pauseToggleHandler,
                            difficultChangeHandler: gameDifficultChangeHandler
                        }}
                    />
                    : null}
            </div>
            {gameHelper.settings.frameBorder ? <div className={classesCss.Border}/> : null}
        </div>
    )
}

export default Frame