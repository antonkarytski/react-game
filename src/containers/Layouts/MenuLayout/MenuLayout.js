import React, { useState } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";
import ResetButton from "../../../components/Navigation/Buttons/ResetButton";
import SoundRangeSlider from "../../../components/Navigation/RangeSlider/SoundRangeSlider";
import StatisticMenu from "../../../components/Navigation/Menu/StatisticMenu";
import PickMenu from "../../../components/Navigation/Menu/PickMenu/PickMenu";
import InfoLayout from "./InfoLayout";
import PlayButton from "../../../components/Navigation/Buttons/PlayButton";
import SpeedRangeSlider from "../../../components/Navigation/RangeSlider/SpeedRangeSlider";
import ModeSelectButtonsSet from "../../../components/Navigation/ModeSelectButtonsSet";
import { MENU_MODE } from "../../../settings/consts";
import classesCss from "./MenuLayout.module.scss";
import { LOCATIONS_MENU_SET } from "../../../settings/locations";

function MenuLayout(props) {
  const { locationData, heroData, sound, statistic } = props;

  const [menuMode, setMenuMode] = useState(MENU_MODE.INIT);
  const { isInfoMenuOpened, isLose } = useSelector(({ game }) => game);

  return (
    <div className={classesCss.MenuLayout}>
      {(() => {
        const { CurrentColumn, LoseMessage, SettingColumn } = classesCss;
        switch (menuMode) {
          case MENU_MODE.INIT: {
            if (isInfoMenuOpened) return <InfoLayout />;
            return (
              <div className={classesCss.MenuContent}>
                {isLose ? (
                  <div className={cx(CurrentColumn, LoseMessage)}>
                    <h2>YOU LOSE</h2>
                    <ResetButton />
                    <span>
                      or press <i>SPACE</i>
                    </span>
                  </div>
                ) : (
                  <div className={CurrentColumn}>
                    <ResetButton />
                    <PlayButton />
                  </div>
                )}
                <div className={SettingColumn}>
                  <SoundRangeSlider
                    initValue={sound.initValue}
                    onSoundToggle={sound.onSoundToggle}
                    soundMuted={sound.muted}
                    onChange={sound.onSoundVolumeChange}
                  />
                  <SpeedRangeSlider />
                  <ModeSelectButtonsSet onModeSelect={setMenuMode} />
                </div>
              </div>
            );
          }
          case MENU_MODE.HERO_SELECT:
            return (
              <PickMenu
                itemData={heroData}
                onBackHandler={() => setMenuMode(MENU_MODE.INIT)}
                previewType={"card"}
              />
            );
          case MENU_MODE.LOCATION_SELECT:
            return (
              <PickMenu
                itemClasses={classesCss.LocationPickerItem}
                itemData={{ ...locationData, itemSet: LOCATIONS_MENU_SET }}
                onBackHandler={() => setMenuMode(MENU_MODE.INIT)}
                previewType={"full"}
              />
            );
          case MENU_MODE.STATISTIC:
            return (
              <StatisticMenu
                statistic={statistic}
                onBackHandler={() => setMenuMode(MENU_MODE.INIT)}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default MenuLayout;
