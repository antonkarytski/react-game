import React, { useEffect, useRef } from "react";
import StyledObstacle from "./styles/StyledObstacle";

const Obstacle = ({ item, gameOnPause, frameWidth }) => {
  const { speed, width, height, altitude, sprite, effect } = item;

  const compStyle = {
    w: width,
    h: height,
    altitude: altitude || 0,
    bgSize: item.customBgSize,
    sprite: sprite,
  };

  const obstacleRef = useRef(null);

  const style = {};
  if (sprite)
    style.backgroundImage = `url(${process.env.PUBLIC_URL + "/" + sprite})`;
  else style.backgroundColor = "red";
  if (gameOnPause) style.animationPlayState = "paused";

  useEffect(() => {
    item.domElement.current = obstacleRef.current;
  }, [item]);

  return (
    <StyledObstacle
      ref={obstacleRef}
      effect={effect}
      compStyle={compStyle}
      style={style}
      frameWidth={frameWidth}
      selfSpeed={speed}
    />
  );
};

export default Obstacle;
