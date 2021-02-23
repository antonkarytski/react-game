import React, {useRef, useState} from 'react'
import classes from './styles/Layouts.module.scss'
import Hero from '../../components/Hero/Hero';
import Obstacle from '../../components/Obstacle/Obstacle';
import {getRandomObstacle} from '../../gameHelper';
import Counter from "../../components/Navigation/Counter/Counter";
import StyledGame from "./styles/StyledGame";
import useTimerGenerator from "../../hooks/useTimerGenerator";
import useTimer from "../../hooks/useTimer";


const GameLayout = ({char, settings, onPauseToggle, gameOnPause, location, bestScore}) => {

    const minTime = 700;
    const maxTime = 2500;
    const stackSize = 8;

    const [obstacles, setObstacle] = useState(Array(stackSize))
    const [nextObstacle, setNextObstacle] = useState(0)
    const [heroPosition, saveHeroPosition] = useState({})
    const [gameTime, setGameTime] = useState(0)
    const selfRef = useRef(null)

    function getRelPosition(objPosition){
        const windowDomRect = selfRef.current.getBoundingClientRect();
        return {
            left: objPosition.left - windowDomRect.left,
            right: objPosition.right - windowDomRect.left,
            top: windowDomRect.bottom - objPosition.top,
            bottom:  windowDomRect.bottom - objPosition.bottom
        }
    }

    function checkCollision(obj1, obj2){
        const rightCross = obj1.right > obj2.left;
        const leftCross = obj1.left < obj2.right;
        const topCross = obj1.top > obj2.bottom;
        const bottomCross = obj1.bottom < obj2.top;
        return rightCross & leftCross & topCross & bottomCross
    }


    //OBSTACLES GENERATION

    useTimerGenerator(() => {
        const obstaclesToAdd = [...obstacles];
        const newObstacle = getRandomObstacle()
        newObstacle.position = 600 // set start position
        obstaclesToAdd[nextObstacle] = newObstacle;
        setObstacle(obstaclesToAdd);
        setNextObstacle(nextObstacle < stackSize - 1 ? nextObstacle + 1 : 0)
    }, [minTime, maxTime], !gameOnPause)


    //OBSTACLES LIFECYCLE\

    useTimer(() => {
        const obstaclesToMove = obstacles.map((obstacle, index) => {
            if (obstacle?.display) {
                const obstacleDom = selfRef.current.querySelector(`[data-index = "${index}"]`)
                const obstaclePosition = obstacleDom.getBoundingClientRect();
                const obstacleRelPosition = getRelPosition(obstaclePosition);
                const heroRelPosition = getRelPosition(heroPosition);
                if (obstacleRelPosition.left <= -40) {
                    obstacle.display = false;
                } else {
                    if (checkCollision(heroRelPosition,obstacleRelPosition)) {
                        onPauseToggle(true, gameTime)
                    }
                    obstacle.position = obstacleRelPosition.left;
                }
            }
            return obstacle
        })
        setObstacle(obstaclesToMove)
        setGameTime(gameTime + 20)
    }, 20, !gameOnPause, obstacles, gameOnPause)

    const selfStyle =  {
        backgroundImage: `url(${process.env.PUBLIC_URL + location.image})`,
        backgroundPosition: `-${gameTime / 5 % 768}px`
    }
    if (gameOnPause) selfStyle.animationPlayState = "paused";

    return (
        <StyledGame
            ref={selfRef}
            style={selfStyle}
            className={classes.GameLayout}>
            <Counter
                bestScore={bestScore}
                score={gameTime}
                className={"counter"}/>
            <Hero
                gameOnPause={gameOnPause}
                setMyPosition={saveHeroPosition}
                item={char}
                settings={settings}
            />
            {
                obstacles.map((obstacle, index) => {
                    if (obstacle?.display) {
                        return (
                            <Obstacle
                                gameOnPause = {gameOnPause}
                                className={"obstacle"}
                                key={index}
                                index={index}
                                item={obstacle}
                            />
                        )
                    }
                    return null
                })
            }
        </StyledGame>
    )
}

export default GameLayout;