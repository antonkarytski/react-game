import { List } from "./list";
import { prepareEnvironment, prepareHeroSet, prepareObstacleSet } from "./helper";
import { PATHS } from "../gameSettings";
import { setWeights } from "../../helpers/array";

export default List.map((location) => {
  const pathToLocationAssets = `${PATHS.assets}/${location.name}`;
  return {
    ...location,
    heroes: prepareHeroSet(pathToLocationAssets, location.heroes),
    obstacles: prepareObstacleSet(pathToLocationAssets, location.obstacles),
    obstaclesWeights: setWeights(location.obstacles),
    environment: prepareEnvironment(pathToLocationAssets, location.environment),
  };
});

export const LOCATIONS_MENU_SET = List.map((location) => {
  const previewFile = location.preview || PATHS.locationPreview;
  return {
    name: location.name,
    preview: `${PATHS.assets}/${location.name}/${previewFile}`,
  };
});
