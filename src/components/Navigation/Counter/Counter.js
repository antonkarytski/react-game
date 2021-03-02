import React, {useState} from 'react'
import useTimer from "../../../hooks/useTimer";
import classesCss from './Counter.module.scss'

const Counter = ({className, bestScore, startTime, gameOnPause}) => {

    const [time, setTime] = useState(new Date())

    const classes = [classesCss.Counter]
    classes.push(className)

    useTimer(() => {
        setTime(new Date())
    }, 40, !gameOnPause, gameOnPause, time)

    const score = Math.floor((time - startTime)/40)
    return(
        <div className = {classes.join(" ")}>
            <span className ={classesCss.BestScore}>{'0'.repeat(8 - (bestScore + '').length) + bestScore}</span>
            \<span className ={classesCss.CurrentScore}>{'0'.repeat(8 - (score + '').length) + score}</span>
        </div>
    )
}

export default Counter