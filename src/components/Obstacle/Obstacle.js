import React from 'react'
import StyledObstacle from './styles/StyledObstacle'

const Obstacle = ({item}) => {

    const {
        width,
        height,
        altitude,
        label,
        position,
    } = item;

    const style = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: 'red',
        bottom: altitude || 0,
        left: `${position}px`
    }

    return (
        <StyledObstacle
            style = {style}
        >
            {label}
        </StyledObstacle>

    )
}

export default Obstacle;