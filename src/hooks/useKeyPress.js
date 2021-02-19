import {useEffect} from 'react'

export default function useKeyPress(fn, action = 'keydown'){
    useEffect(() => {
        window.addEventListener(action, fn);
        return () => window.removeEventListener(action, fn);
    },[fn])
}