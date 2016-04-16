import Shape from './Shape';
import EventEmitter from './EventEmitter';
import Point from './Point';

export default class Draggability extends EventEmitter {

    private active: Shape;

    constructor(
        canvas: HTMLCanvasElement,
        getInstance: (p: Point) => Shape
    ) {
        super();
        const mousePosition = { x: 0, y: 0 };

        canvas.addEventListener('mousedown', e => {
            this.active = getInstance(new Point(e.clientX, e.clientY));
            this.active && this.onDrag(this.active);
            e.preventDefault();
        });

        canvas.addEventListener('mouseup', e => {
            this.active = null;
        });

        canvas.addEventListener('mousemove', e => {
            if (this.active) {
                this.onDrag(this.active);
                this.active.moveBy({
                    x: e.clientX - mousePosition.x,
                    y: e.clientY - mousePosition.y
                });
                this.afterDrag(this.active)
            }
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
        });

        canvas.addEventListener('mouseout', e => {
            this.active = null;
        });

        canvas.addEventListener('contextmenu', e => {
            e.preventDefault();
            return false;
        });
    }

    public getAvtive() {
        return this.active;
    }

    public setActive(active: Shape) {
        this.active = active;
    }

    private onDrag(instance: Shape) {
        this.emit('dirt', instance.getBoundingRect())
        this.emit('maybeBringToForward', instance);
    }

    private afterDrag(instance: Shape) {
        this.emit('dirt', instance.getBoundingRect())
    }
}


class CanvasDragger extends EventEmitter {

    mouseDown = false;

    constructor(private canvas: HTMLCanvasElement) {
        super();
        this.addEventListeners();
    }

    private addEventListeners() {
        this.canvas.addEventListener('mousedown', e => this.onMouseDown(e));
        this.canvas.addEventListener('mouseup', e => this.onMouseUp(e));
        this.canvas.addEventListener('mousemove', e => this.onMouseMove(e));
        this.canvas.addEventListener('mouseout', e => this.onMouseOut(e));
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