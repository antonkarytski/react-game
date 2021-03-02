import React, {useEffect, useState} from 'react'
import './styles/styles.scss';
import Frame from "./containers/Frame";
import {LOCATIONS} from "./locations";
import {SETTINGS} from "./settings";
import gameHelperClass from "./gameHelper";
import StyledApp from "./styles/StyledApp";

const gameHelper = new gameHelperClass(SETTINGS, LOCATIONS)

const App = () => {

    const [screenRotation, setScreenRotation] = useState(
        window.screen?.orientation?.angle
        ?? window.orientation); //for iOs


    const updateScreenRotation = () => {
        setScreenRotation(
            window.screen?.orientation?.angle
            ?? window.orientation)
    }

    useEffect(() => {
        window.addEventListener("orientationchange",updateScreenRotation)
        return () => window.removeEventListener("orientationchange",updateScreenRotation)
    }, [])


    return (
        <StyledApp>
            <Frame
                gameHelper={gameHelper}
                screenRotation = {screenRotation}
            />
        </StyledApp>
    );
}

export default App;
