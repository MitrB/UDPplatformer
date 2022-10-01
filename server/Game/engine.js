import util from "util";
let debug = util.debuglog("engine");
export default class Engine {
  constructor(World) {
    this.world = World;
    this.gravityFactor = 1000;
    this.TICK = 1000 / 60;
    this.tickCOUNT = 0;
    this.gameLoop();

    this.elapsedTime = 0;
    this.previousTime = 0;
  }

  async gameLoop() {
    let now = performance.now();
    this.elapsedTime += now - this.previousTime;
    this.previousTime = now;

    while (this.elapsedTime >= this.TICK) {
      this.elapsedTime -= this.TICK;
      this.physicsUpdate(this.TICK);
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
      if (player.yPosition >= 900 - 10) {
        player.yPosition = 900 - 10;
        player.verticalVelocity = 0;
        if (player.up == true) {
          player.verticalVelocity = -800;

          player.yPosition -= 1;
        }
      } else {
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
      debug("yPos: " + player.yPosition);
      debug("Vvel: " + player.verticalVelocity);
      debug("Hvel: " + player.horizontalVelocity);
    });
  }

  collision() {}
}
