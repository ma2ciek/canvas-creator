import DirtRect from './DirtRect';
import { IShape } from './shapes/Shape';
import Draggability from './Draggability';
import { IPoint, Point } from './utils/Point';
import LayerManager from './LayerManager';
import { log, seal, readonly } from './utils/decorators';

export interface IWorldConfig {
    ontop?: boolean;
}

export default class World {
    private ctx: CanvasRenderingContext2D;

    private dirtRect: DirtRect;
    private worldPosition = new Point(0, 0);
    private layerManager: LayerManager;
    private draggability: Draggability;

    constructor(private canvas: HTMLCanvasElement, config?: IWorldConfig) {
        config = config || {};

        this.dirtRect = new DirtRect();        

        this.ctx = canvas.getContext('2d');
        this.addDraggability(canvas, config.ontop);
        this.layerManager = new LayerManager();

        window.addEventListener('resize', () => this.fixCanvasSize());
        this.fixCanvasSize();
        
        this.draw();        
    }
    
    private fixCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.dirtRect.set(this.canvas.width, this.canvas.height)
    }

    private addDraggability(canvas: HTMLCanvasElement, ontop: boolean) {
        this.draggability = new Draggability(canvas, this.getObject.bind(this));
        this.draggability.on('dirt', rect => this.dirtRect.add(rect));
        this.draggability.on('maybeBringToForward', object => {
            ontop && this.layerManager.bringObjectForward(object);
        });
    }

    public add(object: IShape, position?: number) {
        this.layerManager.add(object, position);
        object.on('loaded', () => this.dirtRect.add(object.getBoundingRect()))
        this.dirtRect.add(object.getBoundingRect());
    }

    public renderAll() {
        const c = this.canvas;
        this.dirtRect.add({ x: 0, y: 0, width: c.width, height: c.height });
    }

    private draw() {
        const rect = this.dirtRect.get();

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(rect.x, rect.y, rect.width, rect.height);
        this.ctx.clip();
        this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);

        this.layerManager.each((i: IShape) =>
            i.containsRect(this.dirtRect.get()) && i.draw(this.ctx));

        this.ctx.restore();
        this.dirtRect.clear();

        requestAnimationFrame(() => this.draw());
    }

    private getObject(p: IPoint) {
        let result: IShape = null;
        this.layerManager.each((object: IShape) => {
            if (object.draggable && object.contains(p)) {
                result = object;
                return;
            }
        });
        return result;
    }

}
