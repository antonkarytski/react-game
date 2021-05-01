import { useEffect, useRef, useState } from "react";
import { useSaveToLocalStorage } from "../hook.localStorage";
import { getSavedNumberVal } from "../../helpers/localStorage";
import { STORAGE_MUTED, STORAGE_VOLUME } from "../../settings/consts";
import { DEFAULTS } from "../../settings/gameSettings";

const savedSound = {
  volume: getSavedNumberVal(STORAGE_VOLUME, DEFAULTS.sound.volume),
  muted: !getSavedNumberVal(STORAGE_MUTED, DEFAULTS.sound.muted),
};

export function useGameAudio() {
  const audioRef = useRef(null);
  const { soundState, ...audioController } = useAudio(
    audioRef.current,
    savedSound
  );

  useSaveToLocalStorage(STORAGE_VOLUME, soundState.volume);
  useSaveToLocalStorage(STORAGE_MUTED, Number(soundState.muted));

  return { audioRef, soundState, ...audioController };
}

export function useAudio(audioElement, initialValues = null) {
  const { soundState, ...audioController } = useSound(initialValues);

  const reloadSound = () => {
    if (!audioElement) return;
    if (!audioElement.paused) audioElement.pause();
    audioElement.load();
    audioElement.muted = soundState.muted;
    audioElement.volume = (soundState.volume / 100) * 0.7;
  };

  useEffect(() => {
    if (!audioElement) return;
    audioElement.muted = soundState.muted;
  }, [soundState.muted, audioElement]);

  useEffect(() => {
    if (!audioElement) return;
    audioElement.volume = (soundState.volume / 100) * 0.7;
  }, [soundState.volume, audioElement]);

  return { soundState, reloadSound, ...audioController };
}

export function useSound(initialValues = DEFAULTS.sound) {
  const [soundState, setSoundState] = useState(initialValues);

  const toggleMute = () => {
    setSoundState(({ muted, volume }) => ({
      volume: muted && volume <= 0 ? 10 : volume,
      muted: !muted,
    }));
  };

  const setVolume = (soundVolume) => {
    setSoundState({
      volume: soundVolume,
      muted: soundVolume <= 0,
    });
  };

  return { soundState, toggleMute, setVolume };
}
