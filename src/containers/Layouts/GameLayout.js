import React, {useRef, useState} from 'react'
import classes from './styles/Layouts.module.scss'
import Hero from '../../components/Hero/Hero';
import Obstacle from '../../components/Obstacle/Obstacle';
import Counter from "../../components/Navigation/Counter/Counter";
import StyledGame, {StyledLayer} from "./styles/StyledGame";
import useTimerGenerator from "../../hooks/useTimerGenerator";
import useTimer from "../../hooks/useTimer";


const GameLayout = (props) => {

    const {
        char,
        gameHelper,
        onPauseToggle,
        gameOnPause,
        environment,
        bestScore,
        soundVolume,
        soundMuted
    } = props

    const stackSize = 8;
    const [obstaclesState, setObstaclesState] = useState({
        obstacles: Array(stackSize),
        nextObstacle: 0
    })
    const [gameTime, setGameTime] = useState(0)
    const selfRef = useRef(null)

    const minTime = 700 - Math.floor(gameTime / 2000) * 10;
    const maxTime = 2500 - Math.floor(gameTime / 2000) * 10;

    function getRelPosition(objPosition) {
        const windowDomRect = selfRef.current.getBoundingClientRect();
        return {
            left: objPosition.left - windowDomRect.left,
            right: objPosition.right - windowDomRect.left,
            top: windowDomRect.bottom - objPosition.top,
            bottom: windowDomRect.bottom - objPosition.bottom
        }
    }

    function prepareCorrection(correction, objectSize) {

        const preparedCorrection = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }
        if (typeof correction === "number") {
            preparedCorrection.top = objectSize.h * correction;
            preparedCorrection.bottom = objectSize.h * correction;
            preparedCorrection.right = objectSize.w * correction;
            preparedCorrection.left = objectSize.w * correction;
        } else if (typeof correction === "object") {
            preparedCorrection.top = objectSize.h * correction.top;
            preparedCorrection.bottom = objectSize.h * correction.bottom;
            preparedCorrection.right = objectSize.w * correction.right;
            preparedCorrection.left = objectSize.w * correction.left;
        }
        return preparedCorrection
    }

    function checkCollision(obj1, obj2, correction) {

        //THIS FUNCTION WILL WORK ONLY WITH RELATED VALUES

        const rightCross = obj1.right - correction[0].right > obj2.left + correction[1].left;
        const leftCross = obj1.left + correction[0].left < obj2.right - correction[1].right;
        const topCross = obj1.top - correction[0].top > obj2.bottom + correction[1].bottom;
        const bottomCross = obj1.bottom + correction[0].bottom < obj2.top - correction[1].top;
        return rightCross & leftCross & topCross & bottomCross
    }

//OBSTACLES GENERATION

    useTimerGenerator(() => {
        const obstaclesToAdd = [...obstaclesState.obstacles];
        const newObstacle = gameHelper.getRandomObstacle()
        newObstacle.position = gameHelper.settings.frameWidth // set start position
        newObstacle.speed = Math.floor(gameTime / 1000) + 1;
        console.log(newObstacle)
        if(newObstacle.randomHeight)
            newObstacle.height = newObstacle.height - newObstacle.height * Math.random() * newObstacle.randomHeight
        if(newObstacle.randomWidth)
            newObstacle.width = newObstacle.width + newObstacle.width * Math.random() * newObstacle.randomWidth
        obstaclesToAdd[obstaclesState.nextObstacle] = newObstacle;
        setObstaclesState({
            obstacles: obstaclesToAdd,
            nextObstacle: obstaclesState.nextObstacle < stackSize - 1 ? obstaclesState.nextObstacle + 1 : 0
        });
    }, [minTime, maxTime], !gameOnPause)


//OBSTACLES LIFECYCLE\

    const step = 40;
    useTimer(() => {
        const obstaclesToMove = obstaclesState.obstacles.map((obstacle, index) => {
            if (obstacle?.display) {
                const obstacleDom = selfRef.current.querySelector(`[data-index = "${index}"]`)
                const heroDom = selfRef.current.querySelector('#hero')
                const obstacleRelPosition = getRelPosition(obstacleDom.getBoundingClientRect());

                if (obstacleRelPosition.left <= -65) {
                    obstacle.display = false;
                } else {

                    const heroRelPosition = getRelPosition(heroDom.getBoundingClientRect());
                    const heroSizeCorrection = prepareCorrection(char.sizeCorrection,
                        {w: char.sizes.default.w, h: char.sizes.default.h})
                    const obstacleSizeCorrection = prepareCorrection(obstacle.sizeCorrection,
                        {w: obstacle.width, h: obstacle.height})
                    if (checkCollision(heroRelPosition, obstacleRelPosition, [heroSizeCorrection, obstacleSizeCorrection])) {
                        onPauseToggle("lose", gameTime + step)
                    }
                    obstacle.position = obstacleRelPosition.left;
                }
            }
            return obstacle
        })
        setObstaclesState({
            obstacles: obstaclesToMove,
            nextObstacle: obstaclesState.nextObstacle
        })
        setGameTime(gameTime + step)
    }, step, !gameOnPause, obstaclesState, gameOnPause)




    let relatedWidth = gameHelper.settings.frameHeight / environment.bgNaturalHeight * environment.bgNaturalWidth;
    if (relatedWidth < gameHelper.settings.frameWidth) {
        relatedWidth = gameHelper.settings.frameWidth
    }
    const bgTime = relatedWidth / gameHelper.settings.frameWidth * 3

    const selfStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL + "/" + environment.bgImage})`,
    }
    const effectStyle = {}
    if (gameOnPause) {
        selfStyle.animationPlayState = "paused";
        effectStyle.animationPlayState = "paused";
    }

    let gameEffects = null
    switch(environment.effects){
        case "disco":
            gameEffects =
                <StyledLayer className={classes.FilterLayout} style={effectStyle}/>
            break
        default: gameEffects = null
            break
    }

    return (
        <StyledGame
            bgWidth={relatedWidth}
            bgTime={bgTime}
            ref={selfRef}
            style={selfStyle}
            className={classes.GameLayout}>

            <Counter
                bestScore={bestScore}
                score={gameTime}
                className={"counter"}/>

            <Hero
                frameWidth = {gameHelper.settings.frameWidth}
                soundVolume={soundVolume}
                soundMuted={soundMuted}
                gameOnPause={gameOnPause}
                item={char}
                settings={gameHelper.settings}
            />

            {
                obstaclesState.obstacles.map((obstacle, index) => {
                    if (obstacle?.display) {
                        return (
                            <Obstacle
                                frameWidth={gameHelper.settings.frameWidth}
                                gameOnPause={gameOnPause}
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
            {gameEffects}


        </StyledGame>
    )
}

export default GameLayout;