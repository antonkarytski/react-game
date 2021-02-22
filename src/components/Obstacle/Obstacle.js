import React from 'react'
import StyledObstacle from './styles/StyledObstacle'

const Obstacle = ({item, index, className, gameOnPause}) => {

    const {
        width,
        height,
        altitude,
        sprite,
    } = item;

    const style = {
        width: `${width}px`,
        height: `${height}px`,
        bottom: altitude || 0,
        backgroundSize: 'contain',
        border: "1px solid black"
    }

    if(sprite) {style.backgroundImage = `url(${process.env.PUBLIC_URL + sprite})`;}
    else {style.backgroundColor = 'red'}
    if(gameOnPause) {
        style.animationPlayState = 'paused';
    }

    return (
        <StyledObstacle
            data-index = {index}
            className = {className}
            style = {style}
        />
    )
}

export default Obstacle;