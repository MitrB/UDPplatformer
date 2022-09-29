export default class Engine {

    constructor(World) {
        this.world = World;
        // this.gameLoop();
    }

    gameLoop() {
        setInterval(() => {
           this.physicsUpdate(); 
        }, 50);
    }

    physicsUpdate() {
        // apply physics
        let players = this.world.players;
    }
}