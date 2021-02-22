import React, {useState} from 'react'
import classesCss from './Frame.module.scss'
import GameLayout from "./Layouts/GameLayout";
import NavigationLayout from "./Layouts/NavigationLayout";
import MenuLayout from "./Layouts/MenuLayout";

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

const Frame = ({settings, char, location}) => {

    const [gameOnPause, setGameOnPause] = useState(false)
    const [loseFlag, setLoseFlag] = useState(false)
    const [gameSet, setNextGameSet] = useState(1)
    const [bestGameScore, setBestGameScore] = useState(0)

    const style = {
        height: settings.frameHeight,
        width: settings.frameWidth
    }

    const onPauseToggle = (flag = false, score = 0) => {
        if (flag) {
            setLoseFlag(true)
            if (score > bestGameScore) {
                setBestGameScore(score)
            }
        }
        setGameOnPause(!gameOnPause)
    }

    const resetGameHandler = () => {
        if (loseFlag) setLoseFlag(false)
        setNextGameSet(gameSet + 1)
        setGameOnPause(false)
    }

    return (
        <div className={classesCss.Wrap}>
            <div className={classesCss.Border} />
            <div className={classesCss.Frame} style={style}>
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
                    loseGame = {loseFlag}
                />
                {gameOnPause ?
                    <MenuLayout
                        onResetGame={resetGameHandler}
                        mode={loseFlag ? "lose" : "pause"}
                    />
                    : null}

            </div>
            <div className={classesCss.Border} />
        </div>
    )
}

export default Frame