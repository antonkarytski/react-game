import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import classesCss from "./Button.module.scss";


/*
    iconDefault - default image of Button
    iconToggled - toggled image of Button
    faIcon - if set iconDefault will read as FontAwesome icon
    className - extended classes for button
    onCLick - callback function
 */

function Button(props) {

    const {
        valueDefault,
        valueToggled,
        toggled,
        className,
        onClick,
        faIcon = false
    } = props


    const [buttonState, changeButtonState] = useState(false)

    const classes = [classesCss.Button]
    classes.push(className)

    let buttonContent = valueDefault
    if (valueToggled) {
        buttonContent = buttonState ? buttonContent : valueToggled
    }
    if (faIcon) {
        buttonContent = <FontAwesomeIcon icon={buttonContent}/>
    }

    useEffect(() => {
        changeButtonState(toggled)
    }, [toggled])

    const buttonClickHandler = () => {
        if(onClick){
            onClick()
            if(valueToggled){
                changeButtonState(!buttonState)
            }
        }
    }

    console.log()

    return (
        <div
            className={classes.join(" ")}
            onClick={() => buttonClickHandler()}
        >
            {buttonContent}
        </div>
    )
}

export default Button
