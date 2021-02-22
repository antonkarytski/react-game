import {useEffect} from 'react'

export default function useKeyPress(fn, action){
    useEffect(() => {
        window.addEventListener(action, fn);
        return () => window.removeEventListener(action, fn);
    },[fn])
}