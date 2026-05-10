import { config } from "./config.js";
import { state } from "./worldState.js";
import { Info } from "./info.js";

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
        this.x += dx / this.scale;
        this.y += dy / this.scale;
    }

    zoom(factor, focusX, focusY) {
        const newScale = this.scale * factor;
        const minScale = 0.05;
        const maxScale = 5.0;
        if (newScale < minScale || newScale > maxScale) return;

        const oldScale = this.scale;
        this.scale = newScale;

        this.x += focusX * (1 / newScale - 1 / oldScale);
        this.y += focusY * (1 / newScale - 1 / oldScale);
    }

    pointInCell(cell, x, y) {
        const height = config.cellSize * this.scale;
        const width = height * 1.5;
        const [cx, cy] = this.spaceToScreen(cell);
        
        return x >= cx && x <= cx + width &&
            y >= cy && y <= cy + height;
    }
}

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.easel = canvas.getContext('2d');

        this.resizeCanvas();
        this.field = new Field(canvas);
        this.info = new Info(canvas, state, this.field);
        
        this.needsRedraw = true;

        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.field.x = this.canvas.width / 2;
            this.field.y = this.canvas.height / 2;
            this.needsRedraw = true;
        });

        console.log('renderer initialized');

        this.startRenderLoop();
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    startRenderLoop() {
        const frame = () => {
            if (this.needsRedraw || this.info.needsRedraw) {
                this.needsRedraw = false;
                this.info.needsRedraw = false;
                this.render();
            }
            requestAnimationFrame(frame);
        }
        frame();
    }

    render() {
        this.easel.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSpace();

        if (config.debugMode)
            this.drawChunkBorders();
    }

    drawSpace() {
        const { space } = state;

        for (const cell of space.getAllCells())
            this.drawCell(cell);
    }

    drawCell(cell) {
        const ctx = this.easel;
        const size = config.cellSize * this.field.scale;

        const [x, y] = this.field.spaceToScreen(cell);

        ctx.fillStyle = cell.highlit ? 'gray' : 
            cell.z === 0 ? 'black' :
            this.getCellColor(cell);;
        ctx.fillRect(x, y, size * 1.5, size);
    }

    getCellColor(cell) {
        
    }

    drawChunkBorders() {
        const { space } = state;
        const ctx = this.easel;

        for (const chunk of space.chunks) {
            const [cx, cy]= this.field.spaceToScreen(chunk.cells[0]);
            const height = config.cellSize * 9 * this.field.scale;
            const width = config.cellSize * 13.5 * this.field.scale;
            ctx.strokeStyle = 'purple';
            ctx.strokeRect(cx, cy, width, height);
        }
    }
}