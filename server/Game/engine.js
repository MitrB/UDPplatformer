export default class Engine {
  constructor(World) {
    this.world = World;
    this.gravityFactor = 9.81;
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
        x: player.state.xPosition,
        y: player.state.yPosition,
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

    players.forEach((value, key) => {
      let player = value;
      // speed = speed_c + a * time
      // movement = position + time * speed + time * a * time^2 / 2
      player.state.verticalVelocity =
        player.state.verticalVelocity + time * this.gravityFactor;
      let yPos =
        player.state.yPosition +
        time * player.state.verticalVelocity +
        ((time ^ 2) / 2) * this.gravityFactor;

      player.state.yPosition = yPos;
    });
  }

  collision() {}
}
