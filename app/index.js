import { Application } from "pixi.js";

export default class App {
    constructor() {
        this.app = new Application({
            width: 100, 
            height: 100,
            backgroundColor: 0x1099b
        });
        document.getElementById("game").appendChild(app.view);
    }
}