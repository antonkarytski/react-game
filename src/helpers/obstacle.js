import { getRandomBetween } from "./math";
import { SPEED_FUNCTION } from "../settings/gameControllers";
import { GAME_PROCESS } from "../settings/gameSettings";
import { OBSTACLE_EFFECTS, OBSTACLE_EFFECTS_MODIFIERS } from "../settings/consts";

function prepareObstacle({ altitude, ...obstacle }) {
  return {
    ...obstacle,
    effect: { ...obstacle.effect },
    altitude: Array.isArray(altitude)
      ? getRandomBetween(altitude[0], altitude[1])
      : altitude,
  };
}

function getRawRandomObstacle({ obstaclesWeights, obstacles }) {
  const range = Math.random() * obstaclesWeights[obstaclesWeights.length - 1];
  for (let i = 0; i < obstaclesWeights.length; i++) {
    if (obstaclesWeights[i] > range) {
      return prepareObstacle(obstacles[i]);
    }
  }
}

function calculateSpeed(countModifier, speedK, difficultyModifier) {
  const speed = SPEED_FUNCTION(GAME_PROCESS.baseSpeed, countModifier);
  return (speed * speedK * difficultyModifier) / 2;
}

function prepareEffectSpeed(speed) {
  if (!speed) return false;
  if (Array.isArray(speed)) return getRandomBetween(speed);
  return speed;
}

function prepareEffectModifiers({ direction }) {
  return {
    direction:
      direction === OBSTACLE_EFFECTS_MODIFIERS.RAND
        ? Math.sign(Math.random - 0.5)
        : false,
  };
}

function prepareEffect(effect) {
  if (effect?.name === OBSTACLE_EFFECTS.ROTATE) {
    const { direction } = prepareEffectModifiers(effect);
    return {
      ...effect,
      direction,
      speed: prepareEffectSpeed(effect.speed),
    };
  }
  return false;
}

function prepareSize(size, randomSizeK) {
  if (!randomSizeK) return size;
  const sizeModifierK = Array.isArray(randomSizeK)
    ? getRandomBetween(randomSizeK)
    : randomSizeK;
  console.log(sizeModifierK);
  return size + size * sizeModifierK * Math.random();
}

export function getRandomObstacle(
  { obstaclesWeights, obstacles },
  { countModifier, difficultyModifier }
) {
  const obstacle = getRawRandomObstacle({ obstaclesWeights, obstacles });

  obstacle.domElement = { current: null };
  obstacle.key = countModifier;
  obstacle.speed = calculateSpeed(
    countModifier,
    obstacle.speedK,
    difficultyModifier
  );
  obstacle.effect = prepareEffect(obstacle.effect);
  obstacle.height = prepareSize(obstacle.height, obstacle.randomHeight);
  obstacle.width = prepareSize(obstacle.width, obstacle.randomWidth);

  return obstacle;
}
