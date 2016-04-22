import Draggability from './Draggability';
import EventEmitter from './utils/EventEmitter';
import Point from './utils/Point';

export default class CanvasDragger extends EventEmitter {

    private mouseDown = false;

    constructor(private canvas: HTMLCanvasElement) {
        super();
        this.addEventListeners();
    }

    private addEventListeners() {
        this.canvas.addEventListener('mousedown', e => e.which == 1 && this.onMouseDown(e));
        this.canvas.addEventListener('mouseup', e => e.which == 1 && this.onMouseUp(e));
        this.canvas.addEventListener('mousemove', e => e.which == 1 && this.onMouseMove(e));
        this.canvas.addEventListener('mouseout', e => e.which == 1 && this.onMouseOut(e));
        this.canvas.addEventListener('contextmenu', e => e.preventDefault());
    }

    private onMouseUp(e: MouseEvent) {
        if (this.mouseDown)
            this.emit('drop', new Point(e.clientX, e.clientY));
        this.mouseDown = false;
    }

    private onMouseOut(e: MouseEvent) {
        if (this.mouseDown)
            this.emit('drop', new Point(e.clientX, e.clientY));
        this.mouseDown = false;
    }

    private onMouseMove(e: MouseEvent) {
        if (this.mouseDown) {
            this.emit('dragging', new Point(e.clientX, e.clientY));
        }
    }

    private onMouseDown(e: MouseEvent) {
        this.mouseDown = true;
        this.emit('dragstart', new Point(e.clientX, e.clientY));
    }
}

