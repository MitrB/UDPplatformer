export default class Player {
    constructor(){
        this.state = new State();
    }
}

class State {
    constructor(){
        this.horizontalVelocity = 0;
        this.verticalVelocity = 0;
        this.xPosition;
        this.yPosition;
    }
}