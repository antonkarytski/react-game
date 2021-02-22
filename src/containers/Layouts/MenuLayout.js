import React from 'react'
import classesCss from './Layouts.module.scss'
import Button from "../../components/Navigation/Button";
import {faUndoAlt} from '@fortawesome/free-solid-svg-icons'

function MenuLayout({mode, onResetGame}) {

    let innerContent = null;
    if (mode === "lose") {
        innerContent =
            <div>
                <h2>ТЫ ПРОИГРАЛ</h2>
                <div onClick={() => onResetGame()}>Начать сначала</div>
            </div>

    } else if(mode === "pause"){
        innerContent =
            <Button
                onClick = {() => onResetGame()}
                className={null}
                valueDefault = {faUndoAlt}
                faIcon = {true}
            />
    }

    return (
        <div className={classesCss.MenuLayout}>
            {innerContent}
        </div>
    )
}

export default MenuLayout