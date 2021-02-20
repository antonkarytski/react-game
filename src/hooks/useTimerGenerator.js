import {useEffect} from 'react'


export default function useTimerGenerator(generateFn, generateTime, checker) {


    useEffect(() => {
        console.log(checker);
        const obstaclesGenerator = setTimeout(() => {generateFn()}, generateTime)
        return () => clearTimeout(obstaclesGenerator)
    }, [checker, generateFn, generateTime])
}

