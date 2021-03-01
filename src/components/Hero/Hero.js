import React, {useEffect, useRef, useState} from 'react'
import useKeyPress from "../../hooks/useKeyPress";
import StyledHero from "./styles/StyledHero";
import Audio from "../Helpres/Audio";
import useEventListener from "../../hooks/useEventListener";

const Hero = ({item, gameOnPause, soundMuted, soundVolume, frameWidth}) => {

    const [heroState, setHeroState] = useState({
        posX: 0,
        move: 'stand', //stand, run, jump, sit
        size: item.sizes.default
    });
    const [firstLoad, setFirstLoad] = useState(true)
    const [touchState, setTouchState] = useState('done')
    const heroDom = useRef(null);


    //redundant
    const soundMap = {
        soundJump: "jump-music",
        soundHello: "hello-music"
    }

    const keyActionsMap = {
        keyup: {
            down: () => {
                if (heroState.move === 'sit') {
                    const newHeroState = {
                        move: 'stand',
                        size: item.sizes.default
                    }
                    updateHeroState(newHeroState)
                }
            },
            left: () => {
                if (heroState.move === 'run') {
                    updateHeroState({move: 'stand'})
                }
            },
            right: () => {
                if (heroState.move === 'run') {
                    updateHeroState({move: 'stand'})
                }
            },
        },
        keydown: {
            down: () => {
                if (heroState.move !== 'jump' && heroState.move !== 'sit') {
                    const newHeroState = {
                        move: 'sit',
                        size: item.sizes.sit
                    }
                    updateHeroState(newHeroState)
                }
            },
            up: () => {
                if (heroState.move !== 'jump' && heroState.move !== 'sit') {
                    playSound("soundJump");
                    updateHeroState({move: 'jump'})
                    setTimeout(() => {
                        updateHeroState({move: 'stand'})
                    }, 700 * 1.5 - 200)
                }
            },
            left: () => {
                if (heroState.move !== 'jump' && heroState.move !== 'sit') {
                    const newHeroState = {
                        move: 'run',
                        posX: getNextPos(-5)
                    }
                    updateHeroState(newHeroState)
                }
            },
            right: () => {
                if (heroState.move !== 'jump' && heroState.move !== 'sit') {
                    const newHeroState = {
                        move: 'run',
                        posX: getNextPos(5)
                    }
                    updateHeroState(newHeroState)
                }
            },
        }
    }

    const touchActionsMap = {
        touchStart: (event) => {
            if (!gameOnPause) {
                setTouchState({y: event.touches[0].clientY, x: event.touches[0].clientX})
            }

        },

        touchMove: (event) => {
            if (!gameOnPause && touchState !== "done") {
                if (heroState.move !== "sit" && touchState.y - event.touches[0].clientY > 100) {
                    keyActionsMap.keydown.up()
                    setTouchState("done")
                } else if (heroState.move !== "sit" && touchState.y - event.touches[0].clientY < -100) {
                    keyActionsMap.keydown.down()
                    setTouchState("done")
                } else if (heroState.move !== "sit" && heroState.move !== "jump") {
                    if (touchState.x - event.touches[0].clientX < -100) {
                        keyActionsMap.keydown.right()
                    } else if (touchState.x - event.touches[0].clientX > 100) {
                        keyActionsMap.keydown.left()
                    }
                }
            }
        },

        touchEnd: () => {
            if (!gameOnPause) {
                if (heroState.move === "sit") {
                    keyActionsMap.keyup.down()
                } else if (heroState.move === "run") {
                    updateHeroState({move: 'stand'})
                }
            }
        }
    }

    const updateHeroState = (state) => {
        setHeroState(Object.assign({}, heroState, state));
    }

    const playSound = (sound) => {
        if (item[sound]) {
            heroDom.current.querySelector(`audio#${soundMap[sound]}`).play();
        }
    }

    const getNextPos = (val) => {
        if (heroState.posX + val > frameWidth) {
            return 0
        } else if (heroState.posX + val < 0) {
            return frameWidth
        } else {
            return heroState.posX + val
        }
    }

    useKeyPress(keyActionsMap.keydown, "keydown", !gameOnPause)
    useKeyPress(keyActionsMap.keyup, "keyup")
    useEventListener(touchActionsMap.touchStart, "touchstart")
    useEventListener(touchActionsMap.touchMove, "touchmove")
    useEventListener(touchActionsMap.touchEnd, "touchend")

    useEffect(() => {
        for (let sound in soundMap) {
            if (item[sound]) {
                const soundEffect = heroDom.current.querySelector(`audio#${soundMap[sound]}`);
                soundEffect.muted = soundMuted;
                soundEffect.volume = soundVolume / 100;
            }
        }
    }, [soundMuted, soundVolume])

    useEffect(() => {
        updateHeroState({
            size: item.sizes.default
        })
        for (let sound in soundMap) {
            if (item[sound]) {
                const soundEffect = heroDom.current.querySelector(`audio#${soundMap[sound]}`);
                soundEffect.muted = soundMuted;
                soundEffect.volume = soundVolume / 100;
            }
        }
    }, [item])

    useEffect(() => {
        if (!gameOnPause && firstLoad) {
            playSound("soundHello");
            setFirstLoad(false);
        }
    }, [gameOnPause])

    const soundArray = []
    for (let sound in soundMap) {
        if (item[sound]) {
            soundArray.push({
                id: soundMap[sound],
                src: item[sound]
            })
        }
    }

    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL + item.sprite})`,
        left: `${heroState.posX}px`,
        height: `${heroState.size.h}px`,
        width: `${heroState.size.w}px`
    }

    if (heroState.move === 'jump' && item.spriteJumpPosition) {
        styles.backgroundPosition = `-${item.spriteJumpPosition.x}px -${item.spriteJumpPosition.y}px`
    }

    if (gameOnPause) styles.animationPlayState = 'paused';

    return (
        <StyledHero
            ref={heroDom}
            id={'hero'}
            style={styles}
            jump={heroState.move === 'jump'}
            sit={heroState.move === 'sit'}
            spriteRunPositions={item.spriteRunPositions}
            spriteRunSteps={item.spriteRunSteps}
            spriteSitPositions={item.spriteSitPositions}
            heroSizes={item.sizes}
        >
            {
                soundArray.map((sound, index) => {
                    return (
                        <Audio
                            key={sound.id + index}
                            id={sound.id}
                            src={sound.src}
                        />
                    )
                })
            }
        </StyledHero>
    )
}


export default Hero;