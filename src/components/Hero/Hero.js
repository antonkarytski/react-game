import React, {useState} from 'react'
import useKeyPress from "../../hooks/useKeyPress";
//import classesCss from "./Hero.module.scss"
import StyledHero from "./styles/StyledHero";


const Hero = ({item, settings}) => {

    const [spriteX, setSpriteX] = useState(0);
    const [spriteY, setSpriteY] = useState(0);
    const [posX, setPosX] = useState(0)
    const [posY, setPosY] = useState(0)
    const [jumpState, setJump] = useState(false)

    //Styles for jump are settled in StyledHero
    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL + item.sprite})`,
        backgroundPosition: `-${spriteX * 52}px -${spriteY * 55}px` ,
        bottom : `${posY}px`,
        left : `${posX}px`,
    }

    const animateMoveX = (val) => {
        setSpriteY(4);
        if(spriteX+val > 11){setSpriteX(0)}
        else if(spriteX+val < 0) {setSpriteX(11)}
        else {setSpriteX(spriteX+val)}
    }

    const moveX = (val) => {
        if(posX+val > 550){setPosX(0)}
        else if(posX+val < 0) {setPosX(550)}
        else {setPosX(posX+val)}
    }

    const moveY = (val) => {
        if(posY+val > 250){setPosY(0)}
        else if(posY+val < 0) {setPosY(250)}
        else {setPosY(posY+val)}
    }

    const resetAnimation = () => {
        setSpriteX(0);
        setSpriteY(0);
    }

    const actions = {
        down : () => {
        },
        up : () => {
            if(jumpState === false){
                setJump( true);
                setTimeout(() => {
                    setJump(false)
                }, 700)
            }
        },
        left : (speed) => {
            animateMoveX(-1);
            moveX(-speed)},
        right: (speed) => {
            animateMoveX(1);
            moveX(speed)},
    }

    //const classes = [classesCss.Hero, classesCss.Jump]

    useKeyPress((e) => {
        console.log(1);
        const dir = e.key.replace("Arrow", "").toLowerCase()
        if(actions.hasOwnProperty(dir)){
            actions[dir](5);
            e.preventDefault();
        }
    }) //keydown by default

    useKeyPress((e) => {
        const dir = e.key.replace("Arrow", "").toLowerCase()
        if(actions.hasOwnProperty(dir)){
            resetAnimation()
        }
    }, "keyup")



    return (
        <StyledHero
            id={'hero'}
            style={styles}
            jump = {jumpState}
        />
    )
}

export default Hero;