import { man, soldier } from "./heroes";
import { blueMonster, yellowMonster } from "./obstacles";

export const locationJungle = {
  name: "jungle",
  label: "Опасные джунгли",
  preview: "",

  heroes: [soldier, man],

  obstacles: [blueMonster, yellowMonster],

  environment: {
    bottom: 0,
    bgMusic: true,
    bgNaturalWidth: 785,
    bgNaturalHeight: 436,
  },
};
