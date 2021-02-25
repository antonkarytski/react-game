import React, {useRef, useState} from 'react'
import useKeyPress from "../../hooks/useKeyPress";
import StyledHero from "./styles/StyledHero";
import Audio from "../Helpres/Audio";


const Hero = ({item, gameOnPause}) => {
    const [heroState, setHeroState] = useState({
        posX: 0,
        move: 'stand', //stand, run, jump, sit
        size: item.sizes.default
    })
    const selfElement = useRef(null);

    const updateHeroState = (state) => {
        setHeroState(Object.assign({}, heroState, state));
    }


    //TODO: MAKE JUMPING PAUSE
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
                    if(item.soundJump){
                        selfElement.current.querySelector(`audio#jump-music`).play();
                    }
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
    useKeyPress(keyActionsMap.keyup, "keyup", !gameOnPause)

    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL + item.sprite})`,
        //backgroundPosition: `-${spritePos.x * 52 + 8}px -${spritePos.y * 55}px`,
        bottom: `0px`,
        left: `${heroState.posX}px`,
        height: `${heroState.size.h}px`,
        width: `${heroState.size.w}px`

    }
    if (gameOnPause) {
        styles.animationPlayState = 'paused';
    }

    return (
        <StyledHero
            ref={selfElement}
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