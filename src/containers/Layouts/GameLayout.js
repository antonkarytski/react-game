import React, {useRef, useState} from 'react'
import classes from './styles/Layouts.module.scss'
import Hero from '../../components/Hero/Hero';
import Obstacle from '../../components/Obstacle/Obstacle';
import Counter from "../../components/Navigation/Counter/Counter";
import StyledGame from "./styles/StyledGame";
import useTimerGenerator from "../../hooks/useTimerGenerator";
import useTimer from "../../hooks/useTimer";
import {gameHelper} from "../../gameHelper";


const GameLayout = ({char, settings, onPauseToggle, gameOnPause, location, bestScore}) => {

    const stackSize = 8;

    const [obstaclesState, setObstaclesState] = useState({
        obstacles : Array(stackSize),
        nextObstacle : 0
    })
    const [gameTime, setGameTime] = useState(0)
    const selfRef = useRef(null)

    const minTime = 700 - Math.floor(gameTime / 2000) * 10;
    const maxTime = 2500 - Math.floor(gameTime / 2000) * 10;

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
        const obstaclesToAdd = [...obstaclesState.obstacles];
        const newObstacle = gameHelper.getRandomObstacle()
        newObstacle.position = 600 // set start position
        newObstacle.speed = Math.floor(gameTime / 2000) + 1
        obstaclesToAdd[obstaclesState.nextObstacle] = newObstacle;
        setObstaclesState({
            obstacles : obstaclesToAdd,
            nextObstacle : obstaclesState.nextObstacle < stackSize - 1 ? obstaclesState.nextObstacle + 1 : 0
        });
    }, [minTime, maxTime], !gameOnPause)


    //OBSTACLES LIFECYCLE\

    useTimer(() => {
        const obstaclesToMove = obstaclesState.obstacles.map((obstacle, index) => {
            if (obstacle?.display) {
                const obstacleDom = selfRef.current.querySelector(`[data-index = "${index}"]`)
                const heroDom = selfRef.current.querySelector('#hero')
                const obstacleRelPosition = getRelPosition(obstacleDom.getBoundingClientRect());
                const heroRelPosition = getRelPosition(heroDom.getBoundingClientRect());
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
        setObstaclesState({
            obstacles : obstaclesToMove,
            nextObstacle : obstaclesState.nextObstacle
        })
        setGameTime(gameTime + 40)
    }, 40, !gameOnPause, obstaclesState, gameOnPause)

    const selfStyle =  {
        backgroundImage: `url(${process.env.PUBLIC_URL + location.image})`,
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
                item={char}
                settings={settings}
            />

            {
                obstaclesState.obstacles.map((obstacle, index) => {
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