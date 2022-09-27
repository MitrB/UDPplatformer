import Player from "./player.js";

export default class World {
    constructor(Server){
        this.idCounter = -1;
        this.server = Server;
        this.players = new Map();
    }

    createPlayer() {
        this.idCounter += 1;
        let player = new Player(this.idCounter);
        this.players.set(player.id, player);
    }

    deletePlayer(id) {
        this.players.delete(id);
    }

    updatePlayerState(id, State) {
        let player = this.players.get(id);
        player.updateState(State);
    }

    updatePlayerPositions(){
        this.server.updatePlayerPositions(positions);
    }
    
}