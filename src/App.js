import React from 'react'
import Frame from "./containers/Frame";
import {LOCATIONS} from "./locations";
import {SETTINGS} from "./settings";
import gameHelperClass from "./gameHelper";
import StyledApp from "./styles/StyledApp";
import useWindowSize from "./hooks/useWindowSize";

const gameHelper = new gameHelperClass(SETTINGS, LOCATIONS)

const App = () => {

    const windowSize = useWindowSize()



    return (
        <StyledApp>
            <Frame
                gameHelper={gameHelper}
                windowSize = {windowSize}
            />
        </StyledApp>
    );
}

export default App;
