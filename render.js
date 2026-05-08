import { config } from "./config.js";
import { state } from "./worldState.js";

const canvas = document.getElementsByTagName('canvas')[0];

class Field {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.scale = 1;
    }

    spaceToScreen(cell) {
        const size = config.cellSize;

        let [x, y] = cell;
        x = (this.x + (x * size * 1.5)) * this.scale;
        y = (this.y + (y * size)) * this.scale;
        
        return [x, y];
    }

    pan(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export const field = new Field();

class Render {
    constructor() {
        this.easel = canvas.getContext('2d');
    }

    drawSpace() {
        const { space } = state;

        for (const cell of space.getAllCells())
            this.drawCell(cell);
    }

    drawCell(cell) {
        const ctx = this.easel;
        const size = config.cellSize;

        const [x, y] = field.spaceToScreen(cell);

        ctx.fillStyle = cell.z === 0 ? 'black' :
            this.getCellColor(cell);
        ctx.fillRect(x, y, size * 1.5, size);

        if (config.debugMode) {
            ctx.fillStyle = 'white';
            ctx.strokeRect(x, y, size * 1.5, size);
        }
    }

    getCellColor(cell) {

    }
}

export const render = new Render();