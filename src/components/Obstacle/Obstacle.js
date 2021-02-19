import React from 'react'
import StyledObstacle from './styles/StyledObstacle'

const Obstacle = ({item}) => {

    const {
        width,
        height,
        altitude
    } = item;

    const getAltitude = (altitude) => {
        if(Array.isArray(altitude)){
            return altitude[0] + Math.random() * (altitude[1] - altitude[0]);
        }
        return altitude;
    }

    const style = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: 'red',
        bottom: getAltitude(altitude) || 0,
        right: '0',
    }

    return (
        <StyledObstacle
            style={style}
        >
            {item.label}
        </StyledObstacle>
    )
}

export default Obstacle;