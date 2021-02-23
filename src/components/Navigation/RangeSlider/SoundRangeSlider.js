import React, {useState} from 'react'
import SoundButton from "../Buttons/SoundButton";
import classesCss from "./SoundRangeSlider.module.scss"

export default function SoundRangeSlider({onChange, onSoundToggle, soundOn, initValue}){

    const [sliderValue, setSliderValue] = useState(initValue)
    const min = 0;
    const max = 100;

    const handleChange = (e) => {
        setSliderValue(e.target.value);
    }

    return (
        <div className = {classesCss.SoundRangeSlider}>
            <SoundButton
                onSoundToggle = {onSoundToggle}
                soundOn = {soundOn}
                className={classesCss.SoundButton}/>
            <input
                onChange={(e) => handleChange(e)}
                type={"range"}
                value={sliderValue}
                min={min}
                max={max}
                className={"slider"}
                id={"myRange"}
                onMouseUp={() => onChange(sliderValue)}
            />
        </div>
    );
}