import geckos from "@geckos.io/client";
import App from "../index.js";

// or add a minified version to your index.html file
// https://github.com/geckosio/geckos.io/tree/master/bundles

class Client {
  constructor() {
    
    this.channel = geckos({ port: 3000 }); // default port is 9208

    this.channel.onConnect((error) => {
      if (error) {
        console.error(error.message);
        return;
      }

      this.channel.on("chat message", (data) => {
        console.log(`You got the message ${data}`);
      });

      this.channel.emit("chat message", "a short message to the server");
    });

    const app = new App(this);
  }

  updatePlayerState(State) {
    this.channel.emit("chat message", "State change");
  }
}



const client = new Client();


