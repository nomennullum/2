
export class Interface {
    constructor(renderer) {
        this.renderer = renderer;

        this.panning = false;
        this.panStart = { x: null, y: null };

        const { canvas } = this.renderer;
        canvas.addEventListener('mousedown', this.startPanning);
        canvas.addEventListener('mousemove', this.panField);
        canvas.addEventListener('mouseup', this.stopPanning);

        console.log('interface initialized');
    }

    startPanning = (e) => {
        this.panning = true;
        this.panStart.x = e.clientX;
        this.panStart.y = e.clientY;
    }

    panField = (e) => {
        if (!this.panning) return;

        const dx = e.clientX - this.panStart.x;
        const dy = e.clientY - this.panStart.y;
        
        this.panStart = { x: e.clientX, y: e.clientY };
        
        const { field } = this.renderer;
        field.pan(dx, dy);

        this.renderer.needsRedraw = true;
    }

    stopPanning = (e) => {
        this.panning = false;
    }
}