
export class Info {
    constructor(canvas, state, field) {
        this.state = state;
        this.canvas = canvas;
        this.field = field;
        this.date = document.getElementById('date');
        this.hint = document.getElementById('hint');
        this.cellUnderCursor = null;
        this.needsRedraw = false;

        canvas.addEventListener('contextmenu', (e) => e.preventDefault());

        canvas.addEventListener('mousemove', this.highlightCell);
        canvas.addEventListener('mousedown', this.showCellCoords);
        canvas.addEventListener('mouseup', this.hideCellCoords);

        console.log('hint initialized');
    }

    highlightCell = (e) => {
        const cells = this.state.space.getAllCells();
        
        for (const cell of cells) {
            cell.highlit = false;
        }
        for (const cell of cells) {
            if (this.field.pointInCell(cell, e.pageX, e.pageY)) {
                this.cellUnderCursor = cell;
                cell.highlit = true;
                this.needsRedraw = true;
                break;
            }
        }
    }

    showCellCoords = (e) => {
        if (e.button !== 2) return;

        this.hint.style.display = 'block';
        this.updateHint(e);

        this.canvas.addEventListener('mousemove', this.updateHint);
    }

    updateHint = (e) => {
        const cell = this.cellUnderCursor;

        this.hint.style.left = `${e.pageX}px`;
        this.hint.style.top = `${e.pageY}px`;
        this.hint.innerHTML = `${cell.x}, ${cell.y}`;
    }

    hideCellCoords = (e) => {
        if (e.button !== 2) return;

        this.hint.innerHTML = '';
        this.hint.style.display = 'none';

        this.canvas.removeEventListener('mousemove', this.updateHint);
    }

    upDate() {
        const date = this.state.time.currentTime;
        this.date.innerHTML = `${date.hour}; ${date.day}; ${date.year}`;
    }
}