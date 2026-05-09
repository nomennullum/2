
export class Info {
    constructor(canvas, state, field) {
        this.state = state;
        this.canvas = canvas;
        this.field = field;
        this.hint = document.getElementById('hint');
        this.needsRedraw = false;

        canvas.addEventListener('mousemove', this.showCellCoords);
        canvas.addEventListener('wheel', this.showCellCoords);

        console.log('hint initialized');
    }

    showCellCoords = (e) => {
        const cells = this.state.space.getAllCells();
        
        for (const cell of cells) {
            cell.highlit = false;
        }
        for (const cell of cells) {
            if (this.field.pointInCell(cell, e.pageX, e.pageY)) {
                this.hint.style.display = 'block';
                this.hint.style.left = `${e.pageX + 5}px`;
                this.hint.style.top = `${e.pageY + 5}px`;
                this.hint.innerHTML = `${cell.x},${cell.y}`;

                cell.highlit = true;
                this.needsRedraw = true;
                break;
            } else {
                this.hint.innerHTML = '';
                this.hint.style.display = 'none';
            }
        }
    }
}