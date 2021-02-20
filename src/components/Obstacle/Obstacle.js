import React from 'react'
import StyledObstacle from './styles/StyledObstacle'

const Obstacle = ({item}) => {

    const {
        width,
        height,
        altitude,
        label
    } = item;


    const style = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: 'red',
        bottom: altitude || 0
    }

    return (
        <StyledObstacle
            style = {style}
            width = {width}
        >
            {label}
        </StyledObstacle>
    )
}

export default Obstacle;