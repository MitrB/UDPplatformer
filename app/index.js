import { Application } from "pixi.js";

export default class App {
    constructor(client) {
        this.client = client;
        this.players = new Map();
        
        this.state = new State();
        this.app = new Application({
            width: 100, 
            height: 100,
            backgroundColor: 0x1099b
        });
        document.getElementById("game").appendChild(this.app.view);

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

    updateControls() {
        this.client.updatePlayerState(this.State);
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