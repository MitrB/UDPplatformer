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
    this.channel;

    this.connect().then(() => {
      console.log("trying to connect");
      this.configureChannel();
      this.createPlayer();
    });
  }

  async connect() {
    this.channel = geckos({ port: 3000, iceServers: geckos.iceServers }); // default port is 9208
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
        this.world.updatePlayerPosition(update);
      });

      this.channel.on("character update", (update) => {
        this.world.updateCharacter(update);
      });

      this.channel.on("tilemap update", (update) => {
        this.world.updateTileMap(update);
      })
      
    });
  }

  updatePlayerState(State) {
    this.sendUnreliableMessage("state update", State);
  }

  createPlayer() {
    let payload = {
      model: undefined,
    };
    this.sendReliableMessage("create player", payload);
  }

  sendReliableMessage(messageType, payload) {
    this.channel.emit(messageType, payload, { reliable: true });
  }

  sendUnreliableMessage(messageType, payload) {
    this.channel.emit(messageType, payload);
  }
}
