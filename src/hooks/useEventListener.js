import {useEffect} from 'react'

export default function useEventListener(fn, action){
    useEffect(() => {
        window.addEventListener(action, fn);
        return () => window.removeEventListener(action, fn);
    },[fn, action])
}