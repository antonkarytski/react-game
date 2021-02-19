import React from 'react'
import './styles/styles.scss';
import Frame from "./containers/Frame";
import {SETTINGS} from "./gameHelper";
import {getHero} from "./characters";

const App = () => {
    return (
        <div className="app">
            <Frame
                settings = {SETTINGS}
                char = {getHero(0)}
            />
        </div>
    );
}

export default App;
