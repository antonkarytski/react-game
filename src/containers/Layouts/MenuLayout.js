import React from 'react'
import classesCss from './Layouts.module.scss'

function MenuLayout({mode, onResetGame}) {

    let innerContent = null;
    if (mode === "lose") {
        innerContent =
            <div>
                <h2>ТЫ ПРОИГРАЛ</h2>
                <div onClick={() => onResetGame()}>Начать сначала</div>
            </div>
    } else if(mode === "pause"){
    }

    return (
        <div className={classesCss.MenuLayout}>
            {innerContent}
        </div>
    )
}

export default MenuLayout