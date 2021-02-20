import React, {useState} from 'react'
import useKeyPress from "../../hooks/useKeyPress";
//import classesCss from "./Hero.module.scss"
import StyledHero from "./styles/StyledHero";


const Hero = ({item}) => {

    const [spriteX, setSpriteX] = useState(0);
    const [spriteY, setSpriteY] = useState(0);
    const [posX, setPosX] = useState(0)
    const [jumpState, setJump] = useState(false)
    const [sitdownState, setSitdown] = useState(false)
    const [size, setSize] = useState([50,40])

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

    const resetAnimation = () => {
        setSpriteX(0);
        setSpriteY(0);
    }

    const actions = {
        down : () => {
            if(!jumpState && !sitdownState ){
                setSitdown( true);
                setSpriteX(4);
                setSpriteY(2.3);
                setSize([30,50])
            }
        },
        up : () => {
            if(!jumpState && !sitdownState ){
                setJump( true);
                setTimeout(() => {
                    setJump(false)
                }, 700 * 1.5 - 200)
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
        const dir = e.key.replace("Arrow", "").toLowerCase()
        if(actions.hasOwnProperty(dir)){
            actions[dir](5);
            e.preventDefault();
        }
    }) //keydown by default

    useKeyPress((e) => {
        const dir = e.key.replace("Arrow", "").toLowerCase()
        if(dir === "down"){
            resetAnimation()
            setSitdown( false);
            setSize([50,40])
        }
    }, "keyup") //KEYUP FOR RESET ANIMATION

    useKeyPress((e) => {
        const dir = e.key.replace("Arrow", "").toLowerCase()
        if(actions.hasOwnProperty(dir)){
            resetAnimation()
        }
    }, "keyup") //KEYUP FOR RESET ANIMATION


    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL + item.sprite})`,
        backgroundPosition: `-${spriteX * 52 + 8}px -${spriteY * 55}px` ,
        bottom : `0px`,
        left : `${posX}px`,
        height: `${size[0]}px`,
        width: `${size[1]}px`
    }



    return (
        <StyledHero
            id={'hero'}
            style={styles}
            jump = {jumpState}
        />
    )
}

export default Hero;