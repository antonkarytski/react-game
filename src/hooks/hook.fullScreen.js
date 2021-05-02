import { useState } from "react";

export function useFullScreen(frameRef) {
  const [fullScreenState, setFullScreenState] = useState(false);

  function launchFullScreen(element) {
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  }

  function cancelFullscreen() {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }

  function toggleFullScreen() {
    console.log(frameRef);
    if (fullScreenState) {
      cancelFullscreen();
    } else {
      launchFullScreen(frameRef);
    }
    setFullScreenState((state) => !state);
  }

  return [fullScreenState, toggleFullScreen];
}
