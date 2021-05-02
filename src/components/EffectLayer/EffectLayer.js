import React from "react";
import Effects from "./Effects";

export default function EffectLayer({ environment: { effect }, paused }) {
  if (!effect || !(effect in Effects)) return null;
  return React.createElement(Effects[effect], { paused });
}
