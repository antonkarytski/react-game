import React, { forwardRef, useEffect, useState } from "react";
import useKeyPress from "../../hooks/hook.keyPress";
import StyledHero from "./styles/StyledHero";
import Audio from "../Helpres/Audio";
import useEventListener from "../../hooks/useEventListener";

const Hero = forwardRef(
  (
    { item: heroData, gameOnPause, soundMuted, soundVolume, frameWidth },
    ref
  ) => {
    const [heroState, setHeroState] = useState({
      posX: 0,
      move: "stand",
      size: heroData.sizes.default,
    });
    const [firstLoad, setFirstLoad] = useState(true);
    const [touchState, setTouchState] = useState("done");

    //redundant
    const soundMap = {
      soundJump: "jump-music",
      soundHello: "hello-music",
    };

    const keyActionsMap = {
      keyup: {
        down: () => {
          if (heroState.move === "sit") {
            const newHeroState = {
              move: "stand",
              size: heroData.sizes.default,
            };
            updateHeroState(newHeroState);
          }
        },
        left: () => {
          if (heroState.move === "run") {
            updateHeroState({ move: "stand" });
          }
        },
        right: () => {
          if (heroState.move === "run") {
            updateHeroState({ move: "stand" });
          }
        },
      },
      keydown: {
        down: () => {
          if (heroState.move !== "jump" && heroState.move !== "sit") {
            const newHeroState = {
              move: "sit",
              size: heroData.sizes.sit,
            };
            updateHeroState(newHeroState);
          }
        },
        up: () => {
          if (heroState.move !== "jump" && heroState.move !== "sit") {
            playSound("soundJump");
            updateHeroState({ move: "jump" });
            setTimeout(() => {
              updateHeroState({ move: "stand" });
            }, 700 * 1.4 - 200);
          }
        },
        left: () => {
          if (heroState.move !== "jump" && heroState.move !== "sit") {
            const newHeroState = {
              move: "run",
              posX: getNextPos(-5),
            };
            updateHeroState(newHeroState);
          }
        },
        right: () => {
          if (heroState.move !== "jump" && heroState.move !== "sit") {
            const newHeroState = {
              move: "run",
              posX: getNextPos(5),
            };
            updateHeroState(newHeroState);
          }
        },
      },
    };

    const touchActionsMap = {
      touchStart: (event) => {
        if (!gameOnPause) {
          setTouchState({
            y: event.touches[0].clientY,
            x: event.touches[0].clientX,
          });
        }
      },

      touchMove: (event) => {
        if (!gameOnPause && touchState !== "done") {
          if (
            heroState.move !== "sit" &&
            touchState.y - event.touches[0].clientY > 100
          ) {
            keyActionsMap.keydown.up();
            setTouchState("done");
          } else if (
            heroState.move !== "sit" &&
            touchState.y - event.touches[0].clientY < -100
          ) {
            keyActionsMap.keydown.down();
            setTouchState("done");
          } else if (heroState.move !== "sit" && heroState.move !== "jump") {
            if (touchState.x - event.touches[0].clientX < -100) {
              keyActionsMap.keydown.right();
            } else if (touchState.x - event.touches[0].clientX > 100) {
              keyActionsMap.keydown.left();
            }
          }
        }
      },

      touchEnd: () => {
        if (!gameOnPause) {
          if (heroState.move === "sit") {
            keyActionsMap.keyup.down();
          } else if (heroState.move === "run") {
            updateHeroState({ move: "stand" });
          }
        }
      },
    };

    const updateHeroState = (state) => {
      setHeroState(Object.assign({}, heroState, state));
    };

    const playSound = (sound) => {
      // if (heroData[sound]) {
      //   heroDom.current.querySelector(`audio#${soundMap[sound]}`).play();
      // }
    };

    const getNextPos = (val) => {
      if (heroState.posX + val > frameWidth) {
        return 0;
      } else if (heroState.posX + val < 0) {
        return frameWidth;
      } else {
        return heroState.posX + val;
      }
    };

    useKeyPress(keyActionsMap.keydown, "keydown", !gameOnPause);
    useKeyPress(keyActionsMap.keyup, "keyup");
    useEventListener(touchActionsMap.touchStart, "touchstart");
    useEventListener(touchActionsMap.touchMove, "touchmove");
    useEventListener(touchActionsMap.touchEnd, "touchend");

    useEffect(() => {
      for (let sound in soundMap) {
        if (heroData[sound]) {
          const soundEffect = ref.current.querySelector(
            `audio#${soundMap[sound]}`
          );
          // soundEffect.muted = soundMuted;
          // soundEffect.volume = soundVolume / 100;
        }
      }
    }, [heroData, soundMuted, soundVolume]);

    useEffect(() => {
      updateHeroState({
        size: heroData.sizes.default,
      });
    }, [heroData]);

    useEffect(() => {
      if (!gameOnPause && firstLoad) {
        playSound("soundHello");
        setFirstLoad(false);
      }
    }, [gameOnPause]);

    const soundArray = [];
    for (let sound in soundMap) {
      if (heroData[sound]) {
        soundArray.push({
          id: soundMap[sound],
          src: heroData[sound],
        });
      }
    }

    const styles = {
      backgroundImage: `url(${process.env.PUBLIC_URL + heroData.sprite})`,
      left: `${heroState.posX}px`,
      height: `${heroState.size.h}px`,
      width: `${heroState.size.w}px`,
    };

    if (heroState.move === "jump" && heroData.spriteJumpPosition) {
      styles.backgroundPosition = `-${heroData.spriteJumpPosition.x}px -${heroData.spriteJumpPosition.y}px`;
    }

    if (gameOnPause) styles.animationPlayState = "paused";

    return (
      <StyledHero
        id={"hero"}
        ref={ref}
        style={styles}
        jump={heroState.move === "jump"}
        sit={heroState.move === "sit"}
        sprite={{
          runPositions: heroData.spriteRunPositions,
          runSteps: heroData.spriteRunSteps,
          sitPositions: heroData.spriteSitPositions,
          sitSteps: heroData.spriteSitSteps,
        }}
        heroSizes={heroData.sizes} //only for calculation jump height, so there is no need in current size
      >
        {soundArray.map((sound, index) => {
          return <Audio key={sound.id + index} id={sound.id} src={sound.src} />;
        })}
      </StyledHero>
    );
  }
);

export default Hero;
