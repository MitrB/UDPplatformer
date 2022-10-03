export default class Player {
    /**
     * Physical player object
     * Acts on the world and the world acts on it.
     * @param {number} id  unique identifier
     * @param {number} length length of player model
     * @param {number} width width of player model
     */
    constructor(id, length, width, x, y){
        this.id = id;
        this.horizontalAcceleration = 750;
        this.maxHorizontalVelocity = 500;
        this.horizontalVelocity = 0;
        this.verticalVelocity = 0;
        this.xPosition = x;
        this.yPosition = y;

        this.length = length;
        this.width = width;

        this.left = false;
        this.right = false;
        this.down = false;
        this.up = false;

        this.jumping = false;

    }

    setPosition(x, y){
        this.xPosition = x;
        this.yPosition = y;
    }

    updateState(state) {
        this.left = state.left;
        this.right = state.right;
        this.down = state.down;
        this.up = state.up;
    }
}