import React from "react";
import classes from "./styles/Layouts.module.scss";
import "../../styles/styles.scss";
import {
  faBars,
  faCompressArrowsAlt,
  faExpandArrowsAlt,
  faQuestion,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Navigation/Buttons/Button";
import SoundButton from "../../components/Navigation/Buttons/SoundButton";
import Counter from "../../components/Navigation/Counter/Counter";
import { useDispatch, useSelector } from "react-redux";

const NavigationLayout = (props) => {
  const {
    onPauseToggle,
    onSoundToggle,
    soundMuted,
    fullScreen,
    fullScreenToggle,
    infoMenuToggle,
    bestScore,
    counterRef,
  } = props;

  const dispatch = useDispatch();
  const { isPause, isLose, isInfoMenuOpened } = useSelector(({ game }) => game);

  return (
    <div className={classes.NavigationLayout}>
      <Button
        onClick={onPauseToggle}
        className={classes.MenuButton}
        valueDefault={faTimes}
        valueToggled={faBars}
        faIcon
        toggled={isPause}
        condition={!isLose}
      />
      <SoundButton
        onSoundToggle={onSoundToggle}
        className={[classes.MenuButton, classes.VolumeButton].join(" ")}
        soundMuted={soundMuted}
      />

      <Counter
        bestScore={bestScore}
        condition={!isPause}
        controllerRef={counterRef}
      />

      <Button
        onClick={() => dispatch(infoMenuToggle())}
        className={[classes.MenuButton, classes.QuestionButton].join(" ")}
        valueDefault={faQuestion}
        valueToggled={faTimes}
        faIcon
        toggled={!isInfoMenuOpened}
      />

      <Button
        onClick={fullScreenToggle}
        className={[classes.MenuButton, classes.FullScreenButton].join(" ")}
        valueDefault={faExpandArrowsAlt}
        valueToggled={faCompressArrowsAlt}
        faIcon
        toggled={!fullScreen}
      />
    </div>
  );
};

export default NavigationLayout;
