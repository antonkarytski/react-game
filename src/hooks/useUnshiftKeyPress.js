import { useState } from "react";
import useKeyPress from "./useKeyPress";

export default function useUnshiftKeyPress(fn, button) {
  const [keyPressed, setKeyPressed] = useState(false);

  useKeyPress(
    {
      [button]: () => {
        if (!keyPressed) {
          setKeyPressed(true);
          fn();
        }
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
