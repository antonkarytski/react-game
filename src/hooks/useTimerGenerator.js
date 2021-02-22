import {useState} from 'react';
import useTimer from "./useTimer";

//useTimerGenerator - is a shell for useTimer
//that generate some action in period generationTimeCont
//generationTimeCont might to be an array or a number, is array - generation time will be given randomly between min and max values in array

//useTimer firs arg - function to call
//checkInterval - how often timer will call
//condition - condition that have to performed for start timer
//timeToNextGen and condition - vars that hook will hanging on
//

function getGenerationTime(generationTimeContainer){
    if(Array.isArray(generationTimeContainer)){
        const minTime = generationTimeContainer[0];
        const maxTime = generationTimeContainer[1];
        return minTime + Math.random() * (maxTime - minTime)
    }
    return generationTimeContainer
}


const useTimerGenerator = (fn, generationTimeCont, condition, checkInterval = 250) => {

    const [timeToNextGen, setTimeToNextGen] = useState(getGenerationTime(generationTimeCont))
    useTimer(() => {
        if (timeToNextGen <= 0) {
            setTimeToNextGen(getGenerationTime(generationTimeCont))
            fn()
        } else {
            setTimeToNextGen(timeToNextGen - checkInterval)
        }
    }, checkInterval, condition, timeToNextGen, condition)
}

export default useTimerGenerator