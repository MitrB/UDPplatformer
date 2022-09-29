import geckos from "@geckos.io/client";
import App from "../game/application.js";

// or add a minified version to your index.html file
// https://github.com/geckosio/geckos.io/tree/master/bundles

export default class Client {
  /**
   *  Client side communication.
   */
  constructor() {
    this.app = new App(this);
    this.connect().then(() => {
      this.configureChannel();
    });


  }

  async connect(){
    this.channel = geckos({ port: 3000 }); // default port is 9208
  }

  configureChannel() {
    this.channel.onConnect((error) => {
      if (error) {
        console.error(error.message);
        return;
      }

      this.channel.on("chat message", (data) => {
        console.log(`You got the message ${data}`);
      });

      this.channel.on("position update", (positionUpdate) => {
        console.log("position update");
        this.app.updatePlayerPosition(positionUpdate);
      });

      this.channel.emit("chat message", "a short message to the server");
      this.id = this.channel.id
    });
  }

  updatePlayerState(State) {
    this.channel.emit("state update", State);
  }

  // TODO: ask the server to create a player
  askForPlayerCreation() {
    this.channel.emit("create player", "");
  }
}
