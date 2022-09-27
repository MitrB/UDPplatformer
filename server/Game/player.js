export default class Player {
    constructor(id){
        this.id = id;
        this.state = new State();
    }

    setPosition(x, y){
        this.state.xPosition = x;
        this.state.yPosition = y;
    }

    updateState(state) {
        if (state.left = true) {
            this.xPosition -= 10;
        }
        if (state.right = true) {
            this.xPosition += 10;
        }
        if (state.up = true) {
            this.yPosition -= 10;
        }
        if (state.down = true) {
            this.yPosition += 10;
        }
    }
}

class State {
    constructor(){
        this.horizontalVelocity = 0;
        this.verticalVelocity = 0;
        this.xPosition = 0;
        this.yPosition = 0;
    }
}