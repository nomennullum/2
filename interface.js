import { brush } from "./brush.js";

export class Interface {
    constructor(renderer) {
        this.renderer = renderer;
        this.brush = brush;

        this.panning = false;
        this.panStart = { x: null, y: null };

        const { canvas } = this.renderer;

        canvas.addEventListener('mousedown', this.startPanning);
        canvas.addEventListener('mousemove', this.panField);
        canvas.addEventListener('mouseup', this.stopPanning);

        canvas.addEventListener('wheel', this.scaleField);

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

    scaleField = (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.3 : 0.7;

        const { field } = this.renderer;
        field.zoom(factor, e.pageX, e.pageY);

        this.renderer.needsRedraw = true;
    }
}