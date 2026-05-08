import { config } from "./config.js";
import { state } from "./worldState.js";

class Field {
    constructor(canvas) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.scale = 1;
    }

    spaceToScreen(cell) {
        const size = config.cellSize;

        let { x, y } = cell;
        x = (this.x + (x * size * 1.5)) * this.scale;
        y = (this.y + (y * size)) * this.scale;
        
        return [x, y];
    }

    pan(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.easel = canvas.getContext('2d');
        this.field = new Field(canvas);
        this.needsRedraw = true;

        console.log('renderer initialized');

        this.startRenderLoop();
    }

    startRenderLoop() {
        const frame = () => {
            if (this.needsRedraw) {
                this.needsRedraw = false;
                this.render();
            }
            requestAnimationFrame(frame);
        }
        frame();
    }

    render() {
        this.easel.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSpace();
    }

    drawSpace() {
        const { space } = state;

        for (const cell of space.getAllCells())
            this.drawCell(cell);
    }

    drawCell(cell) {
        const ctx = this.easel;
        const size = config.cellSize;

        const [x, y] = this.field.spaceToScreen(cell);

        ctx.fillStyle = cell.z === 0 ? 'black' :
            this.getCellColor(cell);
        ctx.fillRect(x, y, size * 1.5, size);

        if (config.debugMode) {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = '1px';
            ctx.strokeRect(x, y, size * 1.5, size);
        }
    }

    getCellColor(cell) {

    }
}