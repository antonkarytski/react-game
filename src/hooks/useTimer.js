import {useEffect} from 'react'


export default function useTimer(generateFn, checkInterval  = 50, condition = true, ...dependencies) {
    useEffect(() => {
        if(condition){
            const generatorTimer = setInterval(() => {
                generateFn()
            }, checkInterval)
            return (() => clearInterval(generatorTimer));
        }
    }, dependencies)
}

