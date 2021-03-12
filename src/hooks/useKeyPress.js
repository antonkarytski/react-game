import useEventListener from './useEventListener'


export default function useKeyPress(fnSet, action, condition = true) {

    useEventListener((e) => {
        if (condition) {
            let dir = e.key.replace("Arrow", "").toLowerCase()
            dir = dir === " "? "SPACE" : dir;
            if (fnSet.hasOwnProperty(dir)) {
                fnSet[dir]();
                e.preventDefault();
            }
        }
    }, [action])
}