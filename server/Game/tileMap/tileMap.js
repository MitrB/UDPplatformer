/**
 * functions for creating and reading tilemaps
 */

export let tilemap = {
  width: 0,
  height: 0,
  map: "",
};

const Tile = {
  air: "0",
  wall: "1",
  spawn: "S",
};

export function createEmptyMap(dim) {
  let map = "";
  for (let w = 0; w < dim.width; w++) {
    for (let h = 0; h < dim.height; h++) {
      map += Tile.air;
    }
  }
  return { width: dim.width, height: dim.height, map: map };
}

/**
 * create map filled with given tile
 */
export function createFullMap(dim, t) {
  let map = "";
  for (let w = 0; w < dim.width; w++) {
    for (let h = 0; h < dim.height; h++) {
      map += t;
    }
  }
  return { width: dim.width, height: dim.height, map: map };
}

/**
 * return the tile in the map at the given position
 */
export function positionToTile(pos, tileLength, map) {
  let indexX = Math.floor(pos.x / tileLength);
  let indexY = Math.floor(pos.y / tileLength);
  let index = indexX + indexY * map.width;
  let mapString = map.map;
  if (index <= mapString.length) {
    return mapString[index];
  } else {
    // position not in map
    return "x";
  }
}

export function printMapConsole(room) {
  let mapstring = room.map;
  for (let h = 0; h < room.height; h++) {
    let row = mapstring.substring(0, room.width);
    mapstring = mapstring.substring(room.width);
    console.log(row);
  }
}

export function findSpawnCoordinates(room) {
  let spawn = [];
  let it = 0;
  for (let w = 0; w < room.width; w++) {
    for (let h = 0; h < room.height; h++) {
    it += 1;
    //   console.log(it + " " + room.map[w + h * room.height]);
      if (room.map[w + h * room.height] == "S") {
        spawn.push([w, h]);
      }
    }
  }
//   console.log(spawn);
  return spawn;
}

export function fixMap(room) {
  // fix Map by extending with walls
}

export function correctMap(room) {
  for (let w = 0; w < room.width; w++) {
    for (let h = 0; h < room.height; h++) {
      if (!Object.values(Tile).includes(room.map[w + h])) {
        return false;
      }
    }
  }
  return room.map.length == room.width * room.height || false;
}
