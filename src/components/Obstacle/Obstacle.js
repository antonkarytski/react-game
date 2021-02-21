import React from 'react'
import StyledObstacle from './styles/StyledObstacle'

const Obstacle = ({item}) => {

    const {
        width,
        height,
        altitude,
        label,
        position,
        sprite,
    } = item;

    const style = {
        width: `${width}px`,
        height: `${height}px`,
        bottom: altitude || 0,
        left: `${position}px`,
        backgroundSize: 'contain'
    }

    if(sprite) {style.backgroundImage = `url(${process.env.PUBLIC_URL + sprite})`;}
    else {style.backgroundColor = 'red'}




    return (
        <StyledObstacle style = {style} />
    )
}

export default Obstacle;