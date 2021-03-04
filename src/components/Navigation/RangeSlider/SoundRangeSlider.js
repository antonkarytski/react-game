import React from 'react'
import SoundButton from "../Buttons/SoundButton";
import classesCss from "./SoundRangeSlider.module.scss"
import RangeSlider from './RangeSlider'

export default function SoundRangeSlider({onChange, onSoundToggle, soundMuted, initValue}) {

    return (
        <div className={classesCss.SoundRangeSlider}>
            <SoundButton
                onSoundToggle={onSoundToggle}
                soundMuted={soundMuted}
                className={classesCss.SoundButton}/>
            <RangeSlider
                initValue = {initValue}
                onChange={onChange}
            />
        </div>
    );
}