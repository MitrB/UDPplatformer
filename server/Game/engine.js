import util from "util";
import {
  characterCollidesWithWall,
  rectangle,
  rectangleCollision,
  tileUnderCharacter,
} from "./collision.js";
let debug = util.debuglog("engine");

export default class Engine {
  constructor(World) {
    this.world = World;
    this.gravityFactor = 1000;
    this.TICK = 1000 / 60;
    this.tickCOUNT = 0;

    this.elapsedTime = 0;
    this.previousTime = 0;

    this.gameLoop();
  }

  async gameLoop() {
    let now = performance.now();
    this.elapsedTime += now - this.previousTime;
    this.previousTime = now;

    while (this.elapsedTime >= this.TICK) {
      this.elapsedTime -= this.TICK;
      this.physicsUpdate(this.TICK);

      //check for collisions
    }

    // TODO: proper snapshots
    this.world.players.forEach((value, key) => {
      let player = value;
      this.world.server.updatePlayerPosition({
        id: player.id,
        x: player.xPosition,
        y: player.yPosition,
        tick: this.tickCOUNT,
      });
    });

    this.tickCOUNT += 1;

    setTimeout(() => {
      this.gameLoop();
    }, this.TICK);
  }

  physicsUpdate(time) {
    time = time / 1000;
    // apply physics
    let players = this.world.players;

    players.forEach((player, key) => {
      //check for state
      let playerHitBox = new rectangle(
        player.xPosition,
        player.yPosition,
        32,
        32
      );

      if (player.up == true) {
        player.verticalVelocity = -400;

        player.yPosition -= 1;
      }

      let SIZE = 32;

      if (characterCollidesWithWall(player, this.world.tilemap)) {
        debug(`collision`);

        // player.horizontalVelocity = 0;
        player.verticalVelocity = 0;
        let relativeCoord = player.yPosition % SIZE;
        if (relativeCoord > SIZE / 2) {
          player.yPosition = Math.floor(player.yPosition / SIZE) * SIZE + SIZE;
        } else {
          player.yPosition = Math.floor(player.yPosition / SIZE) * SIZE;
        }
      }

      if (!tileUnderCharacter(player, this.world.tilemap)) {
        debug(`falling`);
        // speed = speed_c + a * time
        // movement = position + time * speed + time * a * time^2 / 2
        player.verticalVelocity =
          player.verticalVelocity + time * this.gravityFactor;
        let yPos = player.yPosition + time * player.verticalVelocity;

        player.yPosition = yPos;
      }

      if ((player.right == true) & (player.left == false)) {
        player.horizontalVelocity =
          player.horizontalVelocity + time * player.horizontalAcceleration;
        if (player.horizontalVelocity > player.maxHorizontalVelocity) {
          player.horizontalVelocity = player.maxHorizontalVelocity;
        }
        let xPos = player.xPosition + player.horizontalVelocity * time;

        player.xPosition = xPos;
      } else if ((player.left == true) & (player.right == false)) {
        player.horizontalVelocity =
          player.horizontalVelocity + time * player.horizontalAcceleration;
        if (player.horizontalVelocity > player.maxHorizontalVelocity) {
          player.horizontalVelocity = player.maxHorizontalVelocity;
        }
        let xPos = player.xPosition - player.horizontalVelocity * time;

        player.xPosition = xPos;
      } else {
        player.horizontalVelocity = 0;
      }
      debug("xPos: " + player.xPosition);
      debug("yPos: " + player.yPosition);
      debug("Vvel: " + player.verticalVelocity);
      debug("Hvel: " + player.horizontalVelocity);
    });
  }

  collision() {}
}
