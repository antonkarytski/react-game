import useEventListener from "./useEventListener";
import { useState } from "react";

export default function useKeyPress(fnSet, action, condition = true) {
  useEventListener(
    (e) => {
      if (condition) {
        let dir = e.key.replace("Arrow", "").toLowerCase();
        dir = dir === " " ? "SPACE" : dir;
        if (fnSet.hasOwnProperty(dir)) {
          fnSet[dir]();
          e.preventDefault();
        }
      }
    },
    [action]
  );
}

export function useUnshiftKeyPress(fn, button) {
  const [keyPressed, setKeyPressed] = useState(false);

  useKeyPress(
    {
      [button]: () => {
        if (keyPressed) return;
        setKeyPressed(true);
        fn();
      },
    },
    "keydown"
  );

  useKeyPress(
    {
      [button]: () => {
        setKeyPressed(false);
      },
    },
    "keyup"
  );
}
