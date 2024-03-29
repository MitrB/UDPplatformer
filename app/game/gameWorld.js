import { Application } from "pixi.js";
import * as PIXI from "pixi.js";
import sheetJSON from "../assets/spritesheet.json";

let _w = window.innerWidth * 0.99;
let _h = window.innerHeight * 0.99;

export default class World {
  constructor() {
    this.characters = new Map(); // Map of all characters to be drawn on the screen.

    // get tilemap
    this.tileMap;

    // Textures and Sprites
    this.spritesheet = new PIXI.Spritesheet(
      PIXI.BaseTexture.from(sheetJSON.meta.image),
      sheetJSON
    );

    this.app = this.initPixiApp();
    this.drawLoop();
  }

  updateCharacter(properties) {
    let character = this.characters.get(properties.id);

    if (character) {
      character.updateProperties(properties);
    } else {
      this.characters.set(
        properties.id,
        new Character(properties, this.spritesheet, this.app)
      );
    }
  }

  initPixiApp() {
    let app = new Application({
      width: _w,
      height: _h,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      backgroundColor: 0x00000,
    });

    document.getElementById("game").appendChild(app.view);

    return app;
  }

  drawCharacter(char) {
    let lastElementIndex = char.positionUpdateBuffer.length - 1;
    let update = char.positionUpdateBuffer[lastElementIndex];
    if (update) {
      let x = update.x;
      let y = update.y;

      if (char.idle) {
        char.idle.position.x = x;
        char.idle.position.y = y;
      } else {
        let graphics = char.graphics;
        graphics.clear();
        // graphics.lineStyle(5, char.color);
        graphics.beginFill(char.color);
        graphics.drawRect(x, y, 32, 32);
        this.app.stage.addChild(graphics);
      }
    }
  }

  updatePlayerPosition(update) {
    let id = update.id;
    let character = this.characters.get(id);
    if (!character) {
      console.log("ERROR: no character to update position for.");
      return;
    }

    character.positionUpdateBuffer.push(update);
    while (character.positionUpdateBuffer.length > 10) {
      character.positionUpdateBuffer.shift();
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

  updateTileMap(tilemap) {
    this.tileMap = tilemap;
    this.placeTiles(tilemap);
  }

  /*
    Function that places all the tiles for a given tilemap
    */
  placeTiles(tilemap) {
    for (let i = 0; i < tilemap.height; i++) {
      for (let j = 0; j < tilemap.width; j++) {
        switch (tilemap.map[i * tilemap.width + j]) {
          case "1":
            this.drawTile(j * 32, i * 32, 1);
            break;

          default:
            break;
        }
      }
    }
  }

  drawTile(x, y, tile) {
    let graphics = new PIXI.Graphics();
    graphics.lineStyle(1, "0x341534");
    graphics.drawRect(x, y, 32, 32);
    this.app.stage.addChild(graphics);
  }
}

class Character {
  constructor(properties, sheet, app) {
    this.properties = properties;
    this.graphics = new PIXI.Graphics();
    this.positionUpdateBuffer = new Array();
    this.color = "0x" + Math.floor(Math.random() * 16777215).toString(16);

    // sheet.parse(() => {
    //   this.idle = new PIXI.AnimatedSprite(sheet.animations.idle);
    // });
    // app.stage.addChild(this.idle);
  }

  updateProperties(properties) {}
}
