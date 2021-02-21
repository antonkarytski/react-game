import React, {useEffect, useRef, useState} from 'react'
import classes from './Layouts.module.scss'
import Hero from '../../components/Hero/Hero';
import Obstacle from '../../components/Obstacle/Obstacle';
import {getRandomObstacle} from '../../gameHelper';


const GameLayout = ({char, settings}) => {

    const minTime = 700;
    const maxTime = 2500;
    const stackSize = 5;

    const [obstacles, setObstacle] = useState(Array(stackSize))
    const [heroPosition, saveHeroPosition] = useState()
    const [timeToNextGen, setTimeToNextGen] = useState(getTimeToNextGen(minTime, maxTime))
    const [nextObstacle, setNextObstacle] = useState(0)
    const [gameTime, setGameTime] = useState(0)
    const selfRef = useRef(null)


    function getTimeToNextGen(minTime, maxTime) {
        return minTime + Math.random() * (maxTime - minTime)
    }

    function getHeroPosition(position) {
        saveHeroPosition(position)
    }

    //OBSTACLES GENERATION

    useEffect(() => {
        const generatorTimer = setInterval(() => {
            if (timeToNextGen <= 0) {
                setTimeToNextGen(getTimeToNextGen(minTime, maxTime))
                const obstaclesToAdd = [...obstacles];
                const newObstacle = getRandomObstacle()
                newObstacle.position = 600 // set start position
                obstaclesToAdd[nextObstacle] = (newObstacle);
                setObstacle(obstaclesToAdd);

                setNextObstacle(nextObstacle < stackSize - 1 ? nextObstacle + 1 : 0)
            } else {
                setTimeToNextGen(timeToNextGen - 10)
            }
        }, 10)
        return (() => clearInterval(generatorTimer));
    }, [timeToNextGen])


    //OBSTACLES LIFECYCLE

    useEffect(() => {
        const moveGenerator = setInterval(() => {
            const obstaclesToMove = obstacles.map((obstacle) => {
                if (obstacle?.display) {

                    if (obstacle.position <= -obstacle.width) {
                        obstacle.display = false
                    } else {
                        // console.log(obstacle.position);
                        // console.log(heroPosition)

                        const windowPositionLeft = selfRef.current.getBoundingClientRect().left
                        const windowPositionBottom = selfRef.current.getBoundingClientRect().bottom
                        if (heroPosition?.bottom > windowPositionBottom - obstacle.height - obstacle.altitude
                            && heroPosition?.top < windowPositionBottom - obstacle.altitude
                            && ((heroPosition?.right - windowPositionLeft > obstacle.position
                                && heroPosition?.right - windowPositionLeft < obstacle.position + obstacle.width)
                                || (heroPosition?.left - windowPositionLeft > obstacle.position
                                    && heroPosition?.left - windowPositionLeft < obstacle.position + obstacle.width))
                        ) {
                        }
                        obstacle.position = obstacle.position - 8
                    }
                }
                return obstacle
            })
            setObstacle(obstaclesToMove)
            setGameTime(gameTime + 20)
        }, 40)
        return (() => clearInterval(moveGenerator))
    }, [obstacles, gameTime])

    return (
        <div
            ref={selfRef}
            className={classes.GameLayout}>
            <div>
                {gameTime}
            </div>
            <Hero
                getMyPosition={getHeroPosition}
                item={char}
                settings={settings}
            />

            {
                obstacles.map((obstacle, index) => {
                    if (obstacle?.display) {
                        return (
                            <Obstacle
                                key={index}
                                index={index}
                                item={obstacle}
                            />
                        )
                    }
                    return null
                })
            }
        </div>
    )
}

export default GameLayout;