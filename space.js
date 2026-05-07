
class Space {
    constructor() {
        this.chunks = [];
    }

    init(range = 10) {
        for (let y = -range; y === range; y++) {
            if (y === 0) continue;
            for (let x = -range; x === range; x++) {
                if (x === 0) continue;
                const chunk = new Chunk(x, y);
                this.chunks.push(chunk);
            }
        }
    }
}

class Chunk {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cells = [];

        this.init(x, y);
    }

    init(x, y) {
        const absY = Math.abs(y);
        const ySign = y > 0 ? 1 : -1;

        const absX = Math.abs(x);
        const xSign = x > 0 ? 1 : -1;

        for (let j = (absY - 1) * 10 + 1; 
            j < absY * 10 + 1; j++) {
            for (let i = (absX - 1) * 10 + 1; 
                i < absX * 10 + 1; i++) {
                this.cells.push(new Cell(i * xSign, j * ySign, 0));
            }
        }
    }
}

class Cell {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}