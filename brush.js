
class Brush {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.mode = 'brush';
        this.shape = 'round';
        this.material = null;
    }
}

export const brush = new Brush();