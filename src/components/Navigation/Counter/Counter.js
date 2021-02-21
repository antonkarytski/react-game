import React from 'react'
import classesCss from './Counter.module.scss'

const Counter = ({className, score, bestScore}) => {

    const classes = [classesCss.Counter]
    classes.push(className)

    return(
        <div className = {classes.join(" ")}>
            <span className ={classesCss.BestScore}>{'0'.repeat(8 - (bestScore + '').length) + bestScore}</span>
            \<span className ={classesCss.CurrentScore}>{'0'.repeat(8 - (score + '').length) + score}</span>
        </div>
    )
}

export default Counter