import { config } from "./config.js";

export class Space {
    constructor() {
        this.chunks = [];

        this.init();
    }

    init(range = 9) {
        for (let y = -range; y < range; y++) {
            //if (y === 0) continue;
            for (let x = -range; x < range; x++) {
                //if (x === 0) continue;
                const chunk = new Chunk(x, y);
                this.chunks.push(chunk);
            }
        }
    }

    getAllCells() {
        const cells = [];

        for (const chunk of this.chunks)
            cells.push(...chunk.cells);

        return cells;
    }
}

class Chunk {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cells = [];

        this.init(x, y);
    }

    init(cx, cy) {
        const size = config.chunkSize;
        for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {
                const x = cx * size + i;
                const y = cy * size + j;
                this.cells.push(new Cell(x, y, 0));
            }
        }
    }
}

class Cell {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.highlit = false;
    }
}