import Player from "./player.js";
import Engine from "./engine.js";
export default class World {
    /**
     * Game world state.
     * Player management.
     * @param {Server} Server For communicating and receiving position/state updates.
     */
    constructor(Server) {
        this.server = Server;
        this.players = new Map();
        this.running = true;

        this.engine = new Engine(this);
    }

    // Managing player objects
    // TODO: Notify the client that a player has been created in the world. Send ID and starting position
    createPlayer(id) {
        let player = new Player(id);
        this.players.set(id, player);
    }

    deletePlayer(id) {
        this.players.delete(id);
    }

    updatePlayerState(id, State) {
        this.players.get(id).updateState(State);
    }

    // Sending player position update for one id to the client 
    updatePlayerPositions(value, key) {
        let positionUpdate = {"id": key, "x": value.state.xPosition, "y": value.state.yPosition}
        this.server.updatePlayerPositions(positionUpdate);
    }

    // updateLoop() {
    //     if ((this.running = true)) {
    //         setTimeout(() => { 
    //             this.players.forEach((value, key) => {
    //                 this.updatePlayerPositions(value, key);
    //             });
    //             this.updateLoop();
    //         }, 1000/60);
    //     }
    // }
}
