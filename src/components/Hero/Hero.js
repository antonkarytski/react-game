import React, {useEffect, useRef, useState} from 'react'
import useKeyPress from "../../hooks/useKeyPress";
import StyledHero from "./styles/StyledHero";


const Hero = ({item, setMyPosition, gameOnPause}) => {

    const [spritePos, setSpritePos] = useState({x : 0, y : 0})
    const [posX, setPosX] = useState(0)
    const [moveState, setMoveState] = useState('stand') //stand, run, jump, sit
    const [size, setSize] = useState(item.sizes.default)
    const selfElement = useRef(null);


    //TODO: MAKE JUMPING PAUSE
    const keyActionsMap = {
        keyup: {
            down: () => {
                if(moveState === 'sit'){
                    resetAnimation()
                    setMoveState('stand');
                    setSize(item.sizes.default)
                }
            },
            left: () => {
                if (moveState === 'run') {
                    resetAnimation()
                    setMoveState('stand');
                }
            },
            right: () => {
                if (moveState === 'run') {
                    resetAnimation()
                    setMoveState('stand');
                }
            },
        },
        keydown: {
            down: () => {
                if (moveState !== 'jump') {
                    setMoveState('sit');
                    setSpritePos({x: 4, y: 2.3})
                    setSize(item.sizes.sit)
                }
            },
            up: () => {
                if (moveState !== 'jump' && moveState !== 'sit') {
                    setMoveState('jump');
                    resetAnimation()
                    setTimeout(() => {
                        setMoveState('stand');
                    }, 700 * 1.5 - 200)
                }
            },
            left: () => {
                if (moveState !== 'jump' && moveState !== 'sit') {
                    setMoveState('run');
                    animateMoveX(-1);
                    moveX(-5)

                }
            },
            right: () => {
                if (moveState !== 'jump' && moveState !== 'sit') {
                    setMoveState('run');
                    animateMoveX(1);
                    moveX(5);
                }
            },
        }
    }

    const animateMoveX = (val) => {
        let spriteX = spritePos.x + val
        if (spriteX > 11) {
            spriteX = 0
        } else if (spriteX < 0) {
            spriteX = 11
        }
        setSpritePos({y : 4, x : spriteX});
    }

    const moveX = (val) => {
        if (posX + val > 550) {
            setPosX(0)
        } else if (posX + val < 0) {
            setPosX(550)
        } else {
            setPosX(posX + val)
        }
    }

    const resetAnimation = () => {
        setSpritePos({x:0,y:0})
    }

    const getMyOwnPosition = (self) => {
        const left = selfElement.current.getBoundingClientRect().left
        const top = selfElement.current.getBoundingClientRect().top
        return {
            left,
            top,
            right: left + size.w,
            bottom: top + size.h
        }
    }

    useKeyPress(keyActionsMap.keydown, "keydown", !gameOnPause)
    useKeyPress(keyActionsMap.keyup, "keyup", !gameOnPause)

    useEffect(() => {
        if (!gameOnPause) {
            if (moveState !== 'stand') {
                setMyPosition(getMyOwnPosition(selfElement))
            }
        } else if (moveState === 'jump') {
            //selfElement.current.style.animationPlayState = 'paused';
        }
    })

    //Init state for setting first position of hero
    useEffect(() => {
        setMyPosition(getMyOwnPosition(selfElement));
    }, [])


    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL + item.sprite})`,
        backgroundPosition: `-${spritePos.x * 52 + 8}px -${spritePos.y * 55}px`,
        bottom: `0px`,
        left: `${posX}px`,
        height: `${size.h}px`,
        width: `${size.w}px`
    }
    if(gameOnPause) {
        styles.animationPlayState = 'paused';
    }

    return (
        <StyledHero
            ref={selfElement}
            id={'hero'}
            style={styles}
            jump={moveState === 'jump'}
        />
    )
}

export default Hero;