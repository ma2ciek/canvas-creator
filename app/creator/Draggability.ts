import Shape from './Shape';
import EventEmitter from './EventEmitter';
import Point from './Point';
import CanvasDragger from './CanvasDragger';

export default class Draggability extends EventEmitter {

    private active: Shape;
    private canvasDragger: CanvasDragger;

    constructor(
        canvas: HTMLCanvasElement,
        getInstance: (p: Point) => Shape
    ) {
        super();

        const canvasDragger = new CanvasDragger(canvas);
        let mousePosition: Point;

        canvasDragger.on('dragstart', (point: Point) => {
            this.active = getInstance(point);
            this.active && this.beforeDrag(this.active);
            mousePosition = point;
        });

        canvasDragger.on('dragging', (point: Point) => {
            if (!this.active)
                return;
            this.beforeDrag(this.active);
            this.active.moveBy(point.getSubtract(mousePosition));
            this.afterDrag(this.active)
            mousePosition = point;
        });

        canvasDragger.on('drop', (point: Point) => {
            this.active = null;
        });
    }

    public getAvtive() {
        return this.active;
    }

    public setActive(active: Shape) {
        this.active = active;
    }

    private beforeDrag(instance: Shape) {
        this.emit('dirt', instance.getBoundingRect())
        this.emit('maybeBringToForward', instance);
    }

    private afterDrag(instance: Shape) {
        this.emit('dirt', instance.getBoundingRect())
    }
}

