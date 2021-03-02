import React from 'react'
import StyledObstacle from './styles/StyledObstacle'

const Obstacle = ({item, index, className, gameOnPause, frameWidth}) => {

    const {
        speed,
        width,
        height,
        altitude,
        sprite,
        effect
    } = item;

    const compStyle = {
        w: width,
        h: height,
        altitude: altitude || 0,
        bgSize: item.customBgSize,
        sprite: sprite,
    }

    const style = {}
    if (sprite) style.backgroundImage = `url(${process.env.PUBLIC_URL + "/" + sprite})`;
    else style.backgroundColor = 'red'
    if (gameOnPause) style.animationPlayState = 'paused';

    return (
        <StyledObstacle
            effect={effect}
            compStyle={compStyle}
            style={style}
            frameWidth={frameWidth}
            speed={speed}
            className={className}
            data-index={index}
        />
    )
}

export default Obstacle;