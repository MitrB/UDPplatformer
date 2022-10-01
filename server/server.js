import geckos from "@geckos.io/server";
import http from "http";
import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { iceServers } from "@geckos.io/server";

import World from "./Game/world.js";

// command: NODE_DEBUG='server' npm start
// to see debug messages
import util from "util";
let debug = util.debuglog("server");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Server {
  /**
   * Server side communication.
   * Initializes express {http} server.
   * Initializes udp connection with geckos.
   * Initializes game world.
   */
  constructor() {
    this.connections = new Map();
    this.InitServer();
    this.InitWorld();

    // this.Test();
  }

  // After function end, server ready to be connected to.
  InitServer() {
    debug("Initializing Server");
    this.app = express();
    // TODO: convert to https server.
    this.server = http.createServer(this.app);
    // this.io = geckos();
    this.io = geckos({iceServers: iceServers});
    this.port = 3000;

    this.app.use("/", express.static(path.join(__dirname, "../client")));

    this.app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../index.html"));
    });

    this.io.addServer(this.server);
    this.io.onConnection((channel) => {
      debug(`${channel.id} got connected`);
      // Add the channel to the Map of connections
      this.connections.set(channel.id, channel);
      channel.onDisconnect(() => {
        debug(`${channel.id} got disconnected`);
        // Make sure that the channel gets removed from the connections Map
        this.connections.delete(channel.id);
        this.World.deletePlayer(channel.id);
      });

      channel.on("chat message", (data) => {
        debug(`got ${data} from ${channel.id}`);
        // emit the "chat message" data to all channels in the same room
        this.io.room(channel.roomId).emit("chat message", data);
      });
      channel.on("state update", (data) => {
        // debug(`got ${data} from ${channel.id}`);
        this.updatePlayerState(channel.id, data);
      });
      channel.on("create player", (data) => {
        // create player
        this.createPlayer(channel.id);
      });
    });
    // make sure the client uses the same port
    // @geckos.io/client uses the port 9208 by default
    this.server.listen(this.port, () => {
      debug(`Listening on http://localhost:${this.port}`);
    });
  }

  // Initializes the game world.
  InitWorld() {
    this.World = new World(this);
  }

  createPlayer(id) {
    this.World.createPlayer(id);
  }

  updatePlayerPosition(update) {
    this.io.emit("position update", update);
  }

  updatePlayerState(id, State) {
    if (this.World.players.get(id) == undefined) {
      this.World.createPlayer(id);
    }
    this.World.updatePlayerState(id, State);
  }

  // Functions for test purposes.
  Ping() {
    debug("Sending ping");
    this.io.emit("ping", "ping");
  }

  Test() {
    setInterval(() => {
      let messageNumber = Math.floor(Math.random() * 10000);
      debug(`Emitting message with number ${messageNumber}`);
      this.io.emit("chat message", messageNumber);
    }, 1000);
  }
}

const server = new Server();
