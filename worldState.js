import { Space } from "./space.js";
import { Time } from "./time.js";

class State {
    constructor() {
        this.space = new Space();
        this.time = new Time();
    }
}

export const state = new State();