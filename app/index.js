import { Application } from "pixi.js";

export default class App {
    constructor() {
        this.app = new Application({
            width: 100, 
            height: 100,
            backgroundColor: 0x1099b
        });
        console.log("We get here");
        document.getElementById("game").appendChild(this.app.view);
    }
}