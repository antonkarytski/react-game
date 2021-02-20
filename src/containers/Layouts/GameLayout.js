import React, {useEffect, useState} from 'react'
import classes from './Layouts.module.scss'
import Hero from '../../components/Hero/Hero';
import Obstacle from '../../components/Obstacle/Obstacle';
import {getRandomObstacle} from '../../gameHelper';


const GameLayout = ({char, settings}) => {

    const minTime = 900;
    const maxTime = 2800;
    const stackSize = 10;

    const [obstacles, setObstacle] = useState(Array(stackSize))
    const [timeToNextGen, setTimeToNextGen] = useState(getTimeToNextGen(minTime, maxTime))
    const [nextObstacle, setNextObstacle] = useState(0)
    const [gameTime, setGameTime] = useState(0)


    function getTimeToNextGen(minTime, maxTime) {
        return minTime + Math.random() * (maxTime - minTime)
    }

    useEffect(() => {
        const generatorTimer = setInterval(() => {
            if (timeToNextGen <= 0) {
                setTimeToNextGen(getTimeToNextGen(minTime, maxTime))
                const obstaclesToAdd = [...obstacles];
                obstaclesToAdd[nextObstacle] = (getRandomObstacle());
                setObstacle(obstaclesToAdd);

                setNextObstacle(nextObstacle < stackSize -1 ? nextObstacle + 1 : 0)
            } else {
                setTimeToNextGen(timeToNextGen - 10)
            }
        }, 10)
        return (() => clearInterval(generatorTimer));
    }, [timeToNextGen])

    useEffect(() => {
        const moveGenerator = setInterval(() => {
            const obstaclesToMove = obstacles.map((obstacle) => {
                if(obstacle?.display){
                    if(obstacle.lifetime <= 0){
                        obstacle.display = false
                    } else {
                        obstacle.lifetime = obstacle.lifetime - 10
                    }
                }
                return obstacle
            })
            setObstacle(obstaclesToMove)
            setGameTime(gameTime + 10)
            console.log()
        }, 10)
        return(() => clearInterval(moveGenerator))
    },[obstacles])


    return (
        <div className={classes.GameLayout}>
            <div>
                {gameTime}
            </div>
            <Hero
                item={char}
                settings={settings}
            />

            {
                obstacles.map((obstacle, index) => {
                    if(obstacle?.display){
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