import { IShape } from './shapes/Shape';
import EventEmitter from './utils/EventEmitter';
import Point from './utils/Point';
import CanvasDragger from './CanvasDragger';

export default class Draggability extends EventEmitter {

    private active: IShape;
    private canvasDragger: CanvasDragger;

    constructor(
        canvas: HTMLCanvasElement,
        getInstance: (p: Point) => IShape
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
            this.afterDrag(this.active);
            mousePosition = point;
        });

        canvasDragger.on('drop', (point: Point) => {
            this.active = null;
        });
    }

    public getAvtive() {
        return this.active;
    }

    public setActive(active: IShape) {
        this.active = active;
    }

    private beforeDrag(instance: IShape) {
        this.emit('dirt', instance.getBoundingRect())
        this.emit('maybeBringToForward', instance);
    }

    private afterDrag(instance: IShape) {
        this.emit('dirt', instance.getBoundingRect())
    }
}

