import { useWindowSize } from "./hook.window";
import { DEFAULTS } from "../settings/gameSettings";

export function useFrameSize() {
  const { height, width } = useWindowSize();

  const frameWidth = width < DEFAULTS.frameWidth ? width : DEFAULTS.frameWidth;

  const frameHeight =
    width < height || height < DEFAULTS.frameHeight
      ? height
      : DEFAULTS.frameHeight;

  return {
    width: frameWidth,
    height: frameHeight,
  };
}

export function useFrameSizeStyle({ border }) {
  const { width, height } = useFrameSize();

  const isShowFrameBorder =
    width >= DEFAULTS.frameWidth ||
    (height >= DEFAULTS.frameHeight && width >= height);

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };
  if (isShowFrameBorder) style.border = border;
  return style;
}
