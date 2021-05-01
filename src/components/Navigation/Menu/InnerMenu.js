import React from "react";
import BackButton from "../Buttons/BackButton";
import classesCss from "./Menu.module.scss";

export default function InnerMenu({
  children,
  onBackHandler,
  navigationClasses,
  menuClasses,
}) {
  const navigationClassesWrap = [classesCss.NavigationBlock];
  navigationClassesWrap.push(navigationClasses);

  const menuClassesWrap = [classesCss.MenuModule];
  menuClassesWrap.push(menuClasses);

  return (
    <div className={menuClassesWrap.join(" ")}>
      <div className={classesCss.MenuContent}>{children}</div>
      <div className={navigationClassesWrap.join(" ")}>
        <BackButton onBack={onBackHandler} />
      </div>
    </div>
  );
}
