import geckos from "@geckos.io/client";
import App from "../game/application.js";
import World from "../game/gameWorld.js";

// or add a minified version to your index.html file
// https://github.com/geckosio/geckos.io/tree/master/bundles

export default class Client {
  /**
   *  Client side communication.
   */
  constructor() {
    this.app = new App(this);
    this.world = new World(); // Create world for graphics

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

      this.channel.on("position update", (update) => {
        console.log("position update");
        this.world.updatePlayerPosition(update);
      });

      this.id = this.channel.id
    });
  }

  updatePlayerState(State) {
    this.sendUnreliableMessage("state update", State);
  }

  askForPlayerCreation() {
    this.sendReliableMessage("create player", "");
  }


  sendReliableMessage(messageType, payload){
    this.channel.emit(messageType, payload, {reliable: true});
  }

  sendUnreliableMessage(messageType, payload){
    this.channel.emit(messageType, payload);
  }
}
