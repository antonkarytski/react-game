import React from 'react'
import StyledObstacle from './styles/StyledObstacle'

const Obstacle = ({item, index, className, gameOnPause, frameWidth}) => {

    const {
        speed,
        width,
        height,
        altitude,
        sprite,
    } = item;

    const styles = {
        width: `${width}px`,
        height: `${height}px`,
        bottom: altitude || 0,
        backgroundSize: item.customBgSize || 'contain',
    }

    if(sprite) {styles.backgroundImage = `url(${process.env.PUBLIC_URL +"/"+sprite})`;}
    else {styles.backgroundColor = 'red'}
    if(gameOnPause) {
        styles.animationPlayState = 'paused';
    }

    return (
        <StyledObstacle
            frameWidth={frameWidth}
            speed = {speed}
            data-index = {index}
            className = {className}
            style = {styles}
        />
    )
}

export default Obstacle;