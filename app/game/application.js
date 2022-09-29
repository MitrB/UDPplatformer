export default class App {
  /**
   * Pixi js application.
   * Manages the game canvas and drawing of the graphics.
   * @param {Client} client
   */
  constructor(client) {
    this.client = client;
    this.state = new State();
    this.addPlayerInput();
  }

  updateControls() {
    let stateMessage = {
      left: this.state.left,
      right: this.state.right,
      up: this.state.up,
      down: this.state.down,
    };
    this.client.updatePlayerState(stateMessage);
  }

  addPlayerInput() {
    document.addEventListener("keydown", (event) => {
      const keyName = event.key;
      switch (keyName) {
        case "a":
        case "A":
        case "ArrowLeft":
          this.state.left = true;
          this.updateControls();
          break;
        case "d":
        case "D":
        case "ArrowRight":
          this.state.right = true;
          this.updateControls();
          break;
        case "w":
        case "W":
        case "ArrowUp":
          this.state.up = true;
          this.updateControls();
          break;
        case "s":
        case "S":
        case "ArrowDown":
          this.state.down = true;
          this.updateControls();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      const keyName = event.key;
      switch (keyName) {
        case "a":
        case "A":
        case "ArrowLeft":
          this.state.left = false;
          this.updateControls();
          break;
        case "d":
        case "D":
        case "ArrowRight":
          this.state.right = false;
          this.updateControls();
          break;
        case "w":
        case "W":
        case "ArrowUp":
          this.state.up = false;
          this.updateControls();
          break;
        case "s":
        case "S":
        case "ArrowDown":
          this.state.down = false;
          this.updateControls();
          break;
      }
    });
  }
}

class State {
  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
  }
}
