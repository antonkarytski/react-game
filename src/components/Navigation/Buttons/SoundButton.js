import React from "react";
import Button from "./Button";
import { faVolumeDown, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

export default function SoundButton({ onSoundToggle, soundMuted, className }) {
  return (
    <Button
      onClick={onSoundToggle}
      className={className}
      valueDefault={faVolumeDown}
      valueToggled={faVolumeMute}
      faIcon={true}
      toggled={!soundMuted}
    />
  );
}
