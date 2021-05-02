import React from "react";
import cx from "classnames";
import { useFullScreen } from "../../../hooks/hook.fullScreen";
import SoundButton from "../../../components/Navigation/Buttons/SoundButton";
import MenuButton from "../../../components/Navigation/Buttons/MenuButton";
import FullScreenButton from "../../../components/Navigation/Buttons/FullScreenButton";
import InfoButton from "../../../components/Navigation/Buttons/InfoButton";
import GameCounter from "../../../components/Navigation/Counter/GameCounter";
import classes from "./NavigationLayout.module.scss";

const NavigationLayout = (props) => {
  const { onSoundToggle, soundMuted, fullScreenElement } = props;
  const [fullScreenState, toggleFullScreen] = useFullScreen(fullScreenElement);

  return (
    <div className={classes.NavigationLayout}>
      <MenuButton />
      <SoundButton
        onSoundToggle={onSoundToggle}
        className={cx(classes.MenuButton, classes.VolumeButton)}
        soundMuted={soundMuted}
      />
      <GameCounter />
      <InfoButton />
      <FullScreenButton onClick={toggleFullScreen} toggled={!fullScreenState} />
    </div>
  );
};

export default NavigationLayout;
