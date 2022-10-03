import Player from "./player.js";
import Engine from "./engine.js";
import { getRandomLevel } from "./tileMap/levels.js";

import util from "util";
import { findSpawnCoordinates } from "./tileMap/tileMap.js";
let debug = util.debuglog("world");


export default class World {
  /**
   * Game world state.
   * Player management.
   * @param {Server} Server For communicating and receiving position/state updates.
   */
  constructor(Server) {
    this.server = Server;
    this.players = new Map();
    this.running = true;

    this.tilemap = getRandomLevel();
    this.spawnPoints = findSpawnCoordinates(this.tilemap);
    this.engine = new Engine(this);
  }

  // Managing player objects
  // TODO: Notify the client that a player has been created in the world. Send ID and starting position
  createPlayer(id) {
    debug(`Creating character with id: ${id}`);
    let spawn =
      this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];
    console.log(this.spawnPoints);
    console.log(spawn);
    if (!spawn) {
      spawn = [0, 0];
    }
    let player = new Player(id, 32, 32, spawn[0] * 32, spawn[1] * 32);
    this.players.set(id, player);
  }

  deletePlayer(id) {
    this.players.delete(id);
  }

  updatePlayerState(id, State) {
    this.players.get(id).updateState(State);
  }

  // Sending player position update for one id to the client
  updatePlayerPositions(value, key) {
    let positionUpdate = { id: key, x: value.xPosition, y: value.yPosition };
    this.server.updatePlayerPositions(positionUpdate);
  }
}
