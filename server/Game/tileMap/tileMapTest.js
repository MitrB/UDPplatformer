import { levels } from "./levels.js";
import { findSpawnCoordinates, printMapConsole } from "./tileMap.js";

// printMapConsole(levels.level1);
let spawn = findSpawnCoordinates(levels.level1);