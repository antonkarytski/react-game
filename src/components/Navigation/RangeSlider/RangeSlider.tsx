import React, {useState} from 'react'
import classesCss from './RangeSlider.module.scss'

type RangeSliderProps = {
    initValue: number
    classes?: string
    min?: number
    max?: number
    step?: number
    onChange(val: number): void
}

const RangeSlider: React.FC<RangeSliderProps> = (props) => {
    const min: number = props.min || 0;
    const max: number = props.max || 100;
    const step: number = props.step || 1;
    const initValue: number = props.initValue || Math.floor(min + max/2);
    const onChange = props.onChange

    const [value, setValue] = useState<number>(initValue)

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value))
    }

    return(
            <input
                type = {"range"}
                step = {step}
                min = {min}
                max = {max}
                value = {value}
                onChange={changeHandler}
                onMouseUp={() => onChange(value)}
                onTouchEnd={() => onChange(value)}
                className={classesCss.RangeSlider}
            />)
}

export default RangeSlider