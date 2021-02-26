import React, {useEffect, useRef, useState} from 'react'
import useKeyPress from "../../hooks/useKeyPress";
import StyledHero from "./styles/StyledHero";
import Audio from "../Helpres/Audio";


const Hero = ({item, gameOnPause, soundOn, soundVolume}) => {

    const [heroState, setHeroState] = useState({
        posX: 0,
        move: 'stand', //stand, run, jump, sit
        size: item.sizes.default
    })
    const heroDom = useRef(null);

    const soundMap = {
        soundJump : "jump-music",
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

    const updateHeroState = (state) => {
        setHeroState(Object.assign({}, heroState, state));
    }

    const playSound = (sound) => {
        if(item[sound]){
            heroDom.current.querySelector(`audio#${soundMap[sound]}`).play();
        }
    }

    const getNextPos = (val) => {
        if (heroState.posX + val > 550) {
            return 0
        } else if (heroState.posX + val < 0) {
            return 550
        } else {
            return heroState.posX + val
        }
    }

    useKeyPress(keyActionsMap.keydown, "keydown", !gameOnPause)
    useKeyPress(keyActionsMap.keyup, "keyup")

    useEffect(() => {
        for(let sound in soundMap){
            if(item[sound]){
                const soundEffect = heroDom.current.querySelector(`audio#${soundMap[sound]}`);
                soundEffect.muted = !soundOn;
                soundEffect.volume = soundVolume / 100;
            }
        }
    }, [soundOn,soundVolume])

    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL + item.sprite})`,
        left: `${heroState.posX}px`,
        height: `${heroState.size.h}px`,
        width: `${heroState.size.w}px`
    }

    if (gameOnPause) {
        styles.animationPlayState = 'paused';
    }


    return (
        <StyledHero
            ref={heroDom}
            id={'hero'}
            style={styles}
            jump={heroState.move === 'jump'}
            sit={heroState.move === 'sit'}
        >
            {
                item.soundJump?
                <Audio
                    id={"jump-music"}
                    src={item.soundJump}
                /> : null
            }

            {item.label}
        </StyledHero>
    )
}

export default Hero;