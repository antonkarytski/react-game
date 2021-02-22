import useKeyPress from './useKeyPress'


export default function useArrowPress(fnSet, action, condition) {

    useKeyPress((e) => {
        if (condition) {
            const dir = e.key.replace("Arrow", "").toLowerCase()
            if (fnSet.hasOwnProperty(dir)) {
                fnSet[dir](5);
                e.preventDefault();
            }
        }
    }, action)
}