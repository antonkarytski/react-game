import React from 'react'
import classesCss from './Counter.module.scss'

const Counter = ({className}) => {

    const classes = [classesCss.Counter,]
    classes.push(className)

    return(
        <div className = {classes.join(" ")}>
            00000000
        </div>
    )
}

export default Counter