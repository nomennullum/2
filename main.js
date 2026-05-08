import { config } from "./config.js";
import { state } from "./worldState.js";
import { Renderer } from "./render.js";
import { Interface } from "./interface.js";

class Port {
    constructor() {
        this.state = null;
        this.renderer = null;
        this.interface = null;
    }

    init() {
        if (document.getElementById('new')) {
            this.initIndex();
        } else {
            const canvas = document.getElementsByTagName('canvas')[0];
            if (canvas)
                this.initField(canvas);
        }
    }

    initIndex() {
        const newWorld = document.getElementById('new');
        newWorld.addEventListener('click', () => {
            window.location.href = 'field.html';
        });
    }

    initField(canvas) {
        this.state = state;
        this.renderer = new Renderer(canvas);
        this.interface = new Interface(this.renderer);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const port = new Port();
    port.init();
});