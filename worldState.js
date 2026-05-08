import { Space } from "./space.js";

class State {
    constructor() {
        this.space = new Space();
    }
}

export const state = new State();