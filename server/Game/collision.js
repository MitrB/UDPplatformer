import { positionToTile } from "./tileMap/tileMap.js";

    let SIZE = 32
export class rectangle {
  constructor(x, y, l, w) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.w = w;
  }
}

// Simple check to see if 2 rectangles collide
export function rectangleCollision(r1, r2) {
  if (
    r1.x < r2.x + r2.w &&
    r1.x + r1.w > r2.x &&
    r1.y < r2.y + r2.l &&
    r1.y + r1.l > r2.y
  ) {
    return true;
  }
  return false;
}

export function tileUnderCharacter(character, map) {
  let pos = { x: character.xPosition, y: character.yPosition };
  let collPoints = [];

  for (let i = 0; i < 32; i++) {
    collPoints.push({ x: pos.x + i, y: pos.y + 32 + 1 });
  }

  for (let p of collPoints) {
    if (positionToTile(p, 32, map) == "1") {
      return true;
    }
  }
  return false;
}

/**
 * return true if given avatar overlaps with a wall of the given tilemap
 * it checkes the four corners of the square defined by the avatar
 */
 export function characterCollidesWithWall(character, map){
    let pos = {x: character.xPosition, y: character.yPosition};
    let collPoints = [];


    collPoints.push(pos);
    collPoints.push({x: pos.x + SIZE, y: pos.y});
    collPoints.push({x: pos.x, y: pos.y + SIZE});
    collPoints.push({x: pos.x + SIZE, y: pos.y + SIZE});

    for (let p of collPoints) {
        if (positionToTile(p, SIZE, map) == "1") {
            return true;
        }
    }
    return false;
}

export function tileLeft(character, map) {
    let pos = {x: character.xPosition, y: character.yPosition};
    let collPoints = [];

    for (let i = 0; i < SIZE; i++) {
        collPoints.push({x: pos.x, y: pos.y + i});
    }
    for (let p of collPoints) {
        if (positionToTile(p, SIZE, map) == "1") {
            return true;
        }
    }
    return false;
}

export function tileRight(character, map) {
    let pos = {x: character.xPosition, y: character.yPosition};
    let collPoints = [];

    for (let i = 0; i < SIZE; i++) {
        collPoints.push({x: pos.x + SIZE, y: pos.y + i});
    }
    for (let p of collPoints) {
        if (positionToTile(p, SIZE, map) == "1") {
            return true;
        }
    }
    return false;
}