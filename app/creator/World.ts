import DirtRect from './DirtRect';
import Shape from './Shape';
import Draggability from './Draggability';
import { IPoint, Point } from './Point';
import logger from './logger';
import { log, seal, readonly } from './descriptors';

export interface IWorldConfig {
    ontop: boolean;
}

export default class World {
    private ctx: CanvasRenderingContext2D;

    private dirtRect: DirtRect;
    private objects: Shape[] = [];
    private worldPosition = new Point(0, 0);

    constructor(private canvas: HTMLCanvasElement, config: IWorldConfig) {
        this.dirtRect = new DirtRect();

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ctx = canvas.getContext('2d');

        var draggability = new Draggability(canvas, this.getObject.bind(this));

        draggability.on('dirt', rect => this.dirtRect.add(rect));
        draggability.on('maybeBringForward', object => {
            config.ontop && this.bringObjectForward(object);
        });
        draggability.on('worldMove', p => this.moveWorld(p));

        this.draw();
    }
    
    @log
    private moveWorld(p: Point) {
        this.worldPosition.add(p);
        this.dirtRect.add({
            x: 0, y: 0,
            width: this.canvas.width,
            height: this.canvas.height
        });
    }
    public add(object: Shape) {
        this.objects.push(object)
        this.dirtRect.add(object.getBoundingRect());
    }

    public renderAll() {
        const c = this.canvas;
        this.dirtRect.add({ x: 0, y: 0, width: c.width, height: c.height });
    }

    // todo: not working?
    private bringObjectForward(object: Shape) {
        const index = this.objects.indexOf(object);
        this.objects.splice(index, 1);
        this.objects.push(object);
    }

    private draw() {
        logger.frameStart('rendering');
        const rect = this.dirtRect.get();

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(rect.x, rect.y, rect.width, rect.height);
        this.ctx.clip();
        this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);

        this.objects.forEach(i =>
            i.containsRect(this.dirtRect.get()) && i.draw(this.ctx));

        this.ctx.restore();
        this.dirtRect.clear();

        requestAnimationFrame(() => this.draw());
        logger.frameEnd('rendering');
    }

    private getObject(p: IPoint) {
        for (var i = this.objects.length - 1; i >= 0; i--) {
            var object = this.objects[i];
            if (object.draggable && object.contains(p)) {
                return object;
            }
        }
        return null;
    }
}