import React from 'react'
import classesCss from './Frame.module.scss'
import GameLayout from "./Layouts/GameLayout";
import NavigationLayout from "./Layouts/NavigationLayout";

/*

STRUCTURE:
Navigation Layout:
 - Counter
 - Game-Over-Window + retry button + change char Button
 - Skills indicators
 - Char Selection
 - Start Button

 GameLayout
 - Chars
 - Obstacles
 - Skills Effects

 */

const Frame = ({settings, char}) => {

    const style = {
        height: settings.frameHeight,
        width: settings.frameWidth
    }
    return (
        <div className={classesCss.Frame} style={style}>
            <GameLayout
                char = {char}
                settings={settings}
            />
            <NavigationLayout />
        </div>
    )
}

export default Frame