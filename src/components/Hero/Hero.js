import React, {useEffect, useRef, useState} from 'react'
import useKeyPress from "../../hooks/useKeyPress";
import StyledHero from "./styles/StyledHero";


const Hero = ({item, getMyPosition}) => {

    const [spriteX, setSpriteX] = useState(0);
    const [spriteY, setSpriteY] = useState(0);
    const [posX, setPosX] = useState(0)
    const [onJumpState, setOnJumpState] = useState(false)
    const [onSitState, setOnSitState] = useState(false)
    const [onMoveState, setOnMoveState] = useState(false)
    const [size, setSize] = useState([50, 40])
    const selfElement = useRef(null);


    const animateMoveX = (val) => {
        setSpriteY(4);
        if (spriteX + val > 11) {
            setSpriteX(0)
        } else if (spriteX + val < 0) {
            setSpriteX(11)
        } else {
            setSpriteX(spriteX + val)
        }
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
        setSpriteX(0);
        setSpriteY(0);
    }


    const actions = {
        down: () => {
            if (!onJumpState && !onJumpState) {
                setOnSitState(true);
                setSpriteX(4);
                setSpriteY(2.3);
                setSize([30, 50])
            }
        },
        up: () => {
            if (!onJumpState && !onSitState) {
                setOnJumpState(true);
                resetAnimation()
                setTimeout(() => {
                    setOnJumpState(false)
                }, 700 * 1.5 - 200)
            }
        },
        left: (speed) => {
            if (!onJumpState && !onSitState) {
                setOnMoveState(true)
                animateMoveX(-1);
                moveX(-speed)

            }
        },
        right: (speed) => {
            if (!onJumpState && !onSitState) {
                setOnMoveState(true)
                animateMoveX(1);
                moveX(speed);
            }
        },
    }

    //const classes = [classesCss.Hero, classesCss.Jump]

    useKeyPress((e) => {
        const dir = e.key.replace("Arrow", "").toLowerCase()
        if (actions.hasOwnProperty(dir)) {
            actions[dir](5);
            e.preventDefault();
        }
    }) //keydown by default

    useKeyPress((e) => {
        const dir = e.key.replace("Arrow", "").toLowerCase()
        if (dir === "down") {
            resetAnimation()
            setOnSitState(false);
            setSize([50, 40])
        } else if(dir === "left" || dir === "right"){
            if (!onJumpState && !onSitState){
                resetAnimation()
            }
            setOnMoveState(false)
        } else if(dir === "up"){
        }
    }, "keyup") //KEYUP FOR RESET ANIMATION

    useEffect(() => {
        if(onMoveState || onJumpState || onSitState){
            const left = selfElement.current.getBoundingClientRect().left
            const top = selfElement.current.getBoundingClientRect().top
            getMyPosition({
                left,
                top,
                bottom: top + size[0],
                right: left + size[1]
            })
        }
    })


    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL + item.sprite})`,
        backgroundPosition: `-${spriteX * 52 + 8}px -${spriteY * 55}px`,
        bottom: `0px`,
        left: `${posX}px`,
        height: `${size[0]}px`,
        width: `${size[1]}px`
    }


    return (
        <StyledHero
            ref={selfElement}
            id={'hero'}
            style={styles}
            jump={onJumpState}
        />
    )
}

export default Hero;