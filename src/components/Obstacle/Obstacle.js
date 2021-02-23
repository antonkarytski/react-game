import React from 'react'
import StyledObstacle from './styles/StyledObstacle'

const Obstacle = ({item, index, className, gameOnPause}) => {

    const {
        width,
        height,
        altitude,
        sprite,
    } = item;

    const styles = {
        width: `${width}px`,
        height: `${height}px`,
        bottom: altitude || 0,
        backgroundSize: 'contain'
    }

    if(sprite) {styles.backgroundImage = `url(${process.env.PUBLIC_URL + sprite})`;}
    else {styles.backgroundColor = 'red'}
    if(gameOnPause) {
        styles.animationPlayState = 'paused';
    }

    return (
        <StyledObstacle
            data-index = {index}
            className = {className}
            style = {styles}
        />
    )
}

export default Obstacle;