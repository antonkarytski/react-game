import { navalny } from "./heroes";
import { putin, putin2, toiletBrush } from "./obstacles";

export const locationNavalny = {
  name: "aquadisco",
  label: "Акводискотека",

  heroes: [navalny],

  obstacles: [toiletBrush, putin, putin2],

  environment: {
    bottom: 0,
    bgMusic: true,
    bgNaturalWidth: 6935,
    bgNaturalHeight: 763,
    bgImage: "bg-common2.jpg",
    bgNaturalMobileWidth: 2800,
    bgNaturalMobileHeight: 763,
    bgMobileImage: "bg-common.jpg",
    effect: "disco",
  },
};
