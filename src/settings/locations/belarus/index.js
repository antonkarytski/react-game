import { nina } from "./heroes";
import { autozak, commonOmon, puffyOmon, waterBalloon, waterzak } from "./obstacles";

export const locationBelarus = {
  name: "belarus",
  label: "Лукашенку а автозак",
  preview: "preview.png",

  heroes: [nina],

  obstacles: [commonOmon, puffyOmon, autozak, waterzak, waterBalloon],

  environment: {
    bottom: 0,
    bgMusic: true,
    bgNaturalWidth: 4548,
    bgNaturalHeight: 1000,
    bgImage: "bg-common.png",
    bgNaturalMobileWidth: 2465,
    bgNaturalMobileHeight: 700,
    bgMobileImage: "bg-common-mobile.png",
  },
};
