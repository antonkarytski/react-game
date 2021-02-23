import React from 'react'
import './styles/styles.scss';
import Frame from "./containers/Frame";
import {SETTINGS} from "./gameHelper";

const App = () => {
    return (
        <div className="app">
            <Frame
                settings = {SETTINGS}
            />
        </div>
    );
}

export default App;
