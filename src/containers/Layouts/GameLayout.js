import React, {useRef, useState} from 'react'
import classes from './styles/Layouts.module.scss'
import Hero from '../../components/Hero/Hero';
import Obstacle from '../../components/Obstacle/Obstacle';
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
        soundVolume,
        soundMuted
    } = props

    const stackSize = 8;
    const [obstaclesState, setObstaclesState] = useState({
        obstacles: Array(stackSize),
        nextObstacle: 0,
        count: 0
    })
    const selfRef = useRef(null)


    const minTime = gameHelper.settings.minTimeDecreaseFunction(
        gameHelper.settings.generationMinTime,
        obstaclesState.count)

    const maxTime = gameHelper.settings.maxTimeDecreaseFunction(
        gameHelper.settings.generationMaxTime,
        obstaclesState.count)

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
        newObstacle.speed = gameHelper.settings.speedFunction(gameHelper.settings.baseSpeed, obstaclesState.count)
        if (newObstacle.randomHeight)
            newObstacle.height = newObstacle.height - newObstacle.height * Math.random() * newObstacle.randomHeight
        if (newObstacle.randomWidth)
            newObstacle.width = newObstacle.width + newObstacle.width * Math.random() * newObstacle.randomWidth
        obstaclesToAdd[obstaclesState.nextObstacle] = newObstacle;
        setObstaclesState({
            obstacles: obstaclesToAdd,
            nextObstacle: obstaclesState.nextObstacle < stackSize - 1 ? obstaclesState.nextObstacle + 1 : 0,
            count: obstaclesState.count+1
        });
    }, [minTime, maxTime], !gameOnPause)


//OBSTACLES LIFECYCLE

    useTimer(() => {
        let changesFlag = false;
        const obstaclesToMove = obstaclesState.obstacles.map((obstacle, index) => {
            if (obstacle?.display) {
                const obstacleDom = selfRef.current.querySelector(`[data-index = "${index}"]`)
                const heroDom = selfRef.current.querySelector('#hero')
                const obstacleRelPosition = getRelPosition(obstacleDom.getBoundingClientRect());
                if (obstacleRelPosition.left <= -130) {
                    obstacle.display = false;
                    changesFlag = true;
                } else {
                    const heroRelPosition = getRelPosition(heroDom.getBoundingClientRect());
                    let heroSizeCorrection = null

                    //Check if hero on sitState
                    //If hero on sitState so we use Correction fo sit
                    //top+5 cause real size is little less then that settled in settings
                    //If not - correction for standState
                    if(heroRelPosition.top+5 < char.sizes.default.h){
                        heroSizeCorrection = prepareCorrection(char.sizeSitCorrection,
                            {w: char.sizes.sit.w, h: char.sizes.sit.h})
                    } else {
                        heroSizeCorrection = prepareCorrection(char.sizeCorrection,
                            {w: char.sizes.default.w, h: char.sizes.default.h})
                    }
                    const obstacleSizeCorrection = prepareCorrection(obstacle.sizeCorrection,
                        {w: obstacle.width, h: obstacle.height})
                    if (checkCollision(heroRelPosition, obstacleRelPosition, [heroSizeCorrection, obstacleSizeCorrection])) {
                        onPauseToggle("lose")
                        changesFlag = true;
                    }
                }
            }
            return obstacle
        })
        if (changesFlag) {
            setObstaclesState({
                obstacles: obstaclesToMove,
                nextObstacle: obstaclesState.nextObstacle,
                count: obstaclesState.count
            })
        }
    }, 40, !gameOnPause, obstaclesState, gameOnPause)

//RENDERS PREPARE

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
    switch (environment.effects) {
        case "disco":
            gameEffects =
                <StyledLayer className={classes.FilterLayout} style={effectStyle}/>
            break
        default:
            gameEffects = null
            break
    }


    return (
        <StyledGame
            bgWidth={relatedWidth}
            bgTime={bgTime}
            ref={selfRef}
            style={selfStyle}
            className={classes.GameLayout}>

            <Hero
                frameWidth={gameHelper.settings.frameWidth}
                soundVolume={soundVolume}
                soundMuted={soundMuted}
                gameOnPause={gameOnPause}
                item={char}
                settings={gameHelper.settings}
            />

            {
                obstaclesState.obstacles.map((obstacle, index) => {
                    if (obstacle?.display) {
                        console.log(obstacle)
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