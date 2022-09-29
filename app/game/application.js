import { Application } from "pixi.js";
import * as PIXI from "pixi.js";

export default class App {
    /**
     * Pixi js application. 
     * Manages the game canvas and drawing of the graphics.
     * @param {Client} client 
     */
    constructor(client) {
        this.client = client;
        this.players = new Map();
        
        this.state = new State();
        this.app = new Application({
            width: 1000, 
            height: 1000,
            backgroundColor: 0x1099b
        });

        document.getElementById("game").appendChild(this.app.view);

        this.playerGraphics = new PIXI.Graphics();
        this.createPlayer(10, 10);

        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            switch(keyName) {
                case 'a': case 'A': case 'ArrowLeft':
                    this.state.left = true;
                    this.updateControls();
                    break;
                case 'd': case 'D': case 'ArrowRight':
                    this.state.right = true;
                    this.updateControls();
                    break;
                case 'w': case 'W': case 'ArrowUp':
                    this.state.up = true;
                    this.updateControls();
                    break;
                 case 's': case 'S': case 'ArrowDown':
                    this.state.down = true;
                    this.updateControls();
                    break;
              }
          });

        document.addEventListener('keyup', (event) => {
            const keyName = event.key;
            switch(keyName) {
                case 'a': case 'A': case 'ArrowLeft':
                    this.state.left = false;
                  this.updateControls();
                  break;
              case 'd': case 'D': case 'ArrowRight':
                this.state.right = false;
                      this.updateControls();
                      break;
                  case 'w': case 'W': case 'ArrowUp':
                    this.state.up = false;
                  this.updateControls();
                  break;
              case 's': case 'S': case 'ArrowDown':
                this.state.down = false;;
                      this.updateControls();
                      break;
              }
          });
          
    }

    createPlayer(x, y) {
        this.playerGraphics.clear();
        this.playerGraphics.lineStyle(5, 0xFF0000);
        this.playerGraphics.drawRect(x, y, 10, 10);
        this.app.stage.addChild(this.playerGraphics);
    }

    updatePlayerPosition(update) {
        let x = update.positionX;
        let y = update.positionY;
        this.createPlayer(x, y);
    }

    updateControls() {
        let stateMessage = {"left": this.state.left, "right": this.state.right, "up": this.state.up, "down": this.state.down};
        this.client.updatePlayerState(stateMessage);
    }

}

class State {
    constructor(){
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
    }
}