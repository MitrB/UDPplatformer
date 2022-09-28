import Player from "./player.js";

export default class World {
    constructor(Server) {
        this.idCounter = -1;
        this.server = Server;
        this.players = new Map();
        this.running = true;
        this.updateLoop();
    }

    // Managing player objects
    // TODO: Notify the client that a player has been created in the world. Send ID and starting position
    createPlayer() {
        this.idCounter += 1;
        let player = new Player(this.idCounter);
        this.players.set(player.id, player);
    }

    deletePlayer(id) {
        this.players.delete(id);
    }

    updatePlayerState(id, State) {
        this.players.get(id).updateState(State);
    }

    // Sending player position update for one id to the client 
    updatePlayerPositions(value, key) {
        let positionUpdate = {"playerID": key, "positionX": value.state.xPosition, "positionY": value.state.yPosition}
        this.server.updatePlayerPositions(positionUpdate);
    }

    updateLoop() {
        if ((this.running = true)) {
            setTimeout(() => { 
                this.players.forEach((value, key) => {
                    this.updatePlayerPositions(value, key);
                });
                this.updateLoop();
            }, 50);
        }
    }
}
