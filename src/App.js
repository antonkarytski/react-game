import React from 'react'
import './styles/styles.scss';
import Frame from "./containers/Frame";
import {getHero, getLocation, SETTINGS} from "./gameHelper";

const App = () => {
    return (
        <div className="app">
            <Frame
                settings = {SETTINGS}
                char = {getHero("soldier")}
                location={getLocation()}
            />
        </div>
    );
}

export default App;
