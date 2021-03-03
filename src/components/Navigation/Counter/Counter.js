import React, {useEffect, useState} from 'react'
import useTimer from "../../../hooks/useTimer";
import classesCss from './Counter.module.scss'

const Counter = (props) => {


    //TODO: replace with hook
    const {
        bestScore,
        startTime,
        condition,
        id,
        className} = props;

    const [state, setState] = useState({
        score: 0,
        prevTime: startTime
    });

    const classes = [classesCss.Counter]
    classes.push(className)

    useTimer(() => {
        const currentTime = new Date();
        setState({
            score: Math.floor((currentTime - state.prevTime)/40) + state.score,
            prevTime: currentTime
        })
    }, 40, !condition, condition, state.score)

    useTimer(() => {
        const currentTime = new Date();
        setState({
            score: state.score,
            prevTime: currentTime
        })
    }, 40, condition, condition)

    useEffect(() => {
        setState({
            score: 0,
            prevTime: startTime
        })
    }, [startTime])




    return(
        <div id={id} data-score = {state.score} className = {classes.join(" ")}>
            <span className ={classesCss.BestScore}>{'0'.repeat(8 - (bestScore + '').length) + bestScore}</span>
            \<span className ={classesCss.CurrentScore}>{'0'.repeat(8 - (state.score + '').length) + state.score}</span>
        </div>
    )
}

export default Counter