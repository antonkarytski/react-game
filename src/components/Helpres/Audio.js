import React, { forwardRef } from "react";

const Audio = forwardRef(({ src, loop }, ref) => {
  return (
    <audio ref={ref} preload={"auto"} loop={loop || false}>
      <source src={process.env.PUBLIC_URL + src} type={"audio/mp3"} />
    </audio>
  );
});

export default Audio;
