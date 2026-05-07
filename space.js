
class Space {
    constructor() {
        this.chunks = [];
    }
}

class Chunk {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cells = [];
    }
}

class Cell {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}