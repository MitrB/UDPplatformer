import { Application } from "pixi.js";
import * as PIXI from "pixi.js";

export default class World {
  constructor() {
    this.app = this.initPixiApp();
    this.characters = new Map(); // Map of all characters to be drawn on the screen.

    this.drawLoop();
  }

  initPixiApp() {
    let app = new Application({
      width: 1000,
      height: 1000,
      backgroundColor: 0x00000,
    });

    document.getElementById("game").appendChild(app.view);

    return app;
  }
  drawCharacter(char) {
    console.log("drawing");
    let lastElementIndex = char.positionUpdateBuffer.length - 1;
    let update =
      char.positionUpdateBuffer[lastElementIndex];
    if (update) {
      let x = update.x;
      let y = update.y;

      let graphics = char.graphics;
      graphics.clear();
      graphics.lineStyle(5, char.color);
      graphics.drawRect(x, y, 10, 10);
      this.app.stage.addChild(graphics);
    }
  }

  updatePlayerPosition(update) {
    let id = update.id;
    let player = this.characters.get(id);
    if (!player) {
      player = new Player();
      this.characters.set(id, player);
    }

    player.positionUpdateBuffer.push(update);
    while (player.positionUpdateBuffer.length > 10) {
      player.positionUpdateBuffer.shift();
    }
  }

  // TODO: client interpolation + prediction
  drawLoop() {
    setInterval(() => {
      this.characters.forEach((value, key) => {
        this.drawCharacter(value);
      });
    }, 1000 / 60);
  }
}

class Player {
  constructor() {
    this.graphics = new PIXI.Graphics();
    this.positionUpdateBuffer = new Array();
    this.color = "0x" + Math.floor(Math.random()*16777215).toString(16)
  }
}
