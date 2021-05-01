import { useEffect, useState } from "react";

export function useWindowSize(fn = null) {
  const [windowSizes, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function resizeHandler() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (fn) fn(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [fn]);

  return windowSizes;
}

export default useWindowSize;
