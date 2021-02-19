import React, {useState} from 'react'
import classes from './Layouts.module.scss'
import Hero from '../../components/Hero/Hero';
import Obstacle from '../../components/Obstacle/Obstacle';
import {getRandomObstacle} from '../../gameHelper';


const GameLayout = ({char,settings}) => {

    const [obstacles, updateObstacles] = useState([])

    const obstaclesGenerator = () => {
        const minTime = 3000;
        const maxTime = 5000;
        setTimeout(() => {
            const obst = [...obstacles];
            obst.push(getRandomObstacle())
            updateObstacles(obst);
            obstaclesGenerator()
        }, minTime + Math.random() * (maxTime - minTime))
    }

    //obstaclesGenerator()

    return(
        <div className={classes.GameLayout}>
            <Hero
                item = {char}
                settings = {settings}
            />

            {
                obstacles.map((obstacle, index) => {
                    return(
                        <Obstacle
                            key = {index}
                            index = {index}
                            item = {getRandomObstacle()}
                        />
                    )
                })
            }

        </div>
    )
}

export default GameLayout;