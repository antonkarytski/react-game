import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import classesCss from "./Buttons.module.scss";


/*
    iconDefault - default image of Button
    iconToggled - toggled image of Button
    faIcon - if set iconDefault will read as FontAwesome icon
    className - extended classes for button
    onCLick - callback function
 */

function Button(props) {

    const {
        condition,
        valueDefault,
        valueToggled,
        className,
        onClick,
        faIcon = false
    } = props
    const toggled = props.toggled? props.toggled : false;

    const [buttonToggled, changeButtonState] = useState(toggled)

    const classes = [classesCss.Button]
    classes.push(className)

    let buttonContent = valueToggled ? buttonToggled ? valueDefault : valueToggled : valueDefault;

    if (faIcon) {
        buttonContent = <FontAwesomeIcon icon={buttonContent}/>
    }

    useEffect(() => {
        changeButtonState(toggled)
    }, [toggled])

    const buttonClickHandler = () => {
        if(condition ?? true){
            if(onClick) onClick()
            if(valueToggled) changeButtonState(!buttonToggled)
        }
    }

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
