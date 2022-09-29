import { Application } from "pixi.js";
import * as PIXI from "pixi.js";

export default class World {
  constructor() {
    this.app = this.initPixiApp();
    this.playerCharacter;
    this.characters = new Map(); // Map of all characters to be drawn on the screen.

  }

  initPixiApp() {
    let app = new Application({
      width: 1000,
      height: 1000,
      backgroundColor: 0x1099b,
    });

    document.getElementById("game").appendChild(app.view);

    return app;
  }
  drawCharacter(char, x, y) {
    let graphics = char.graphics;
    graphics.clear();
    graphics.lineStyle(5, 0xff0000);
    graphics.drawRect(x, y, 10, 10);
    this.app.stage.addChild(graphics);
  }

  updatePlayerPosition(update) {
    let id = update.id;
    if (!this.characters.get(id)) {
        let player = new Player();
        this.characters.set(id, player);
    }

    let x = update.x;
    let y = update.y;
    let char = this.characters.get(id);
    this.drawCharacter(char, x, y);
  }

//   drawUpdate() {
//     this.characters.forEach((char, id) => {
//         this.drawCharacter(char, )
//     });
//   }

}


class Player {
    constructor(){
        this.graphics = new PIXI.Graphics(); 
    }
}