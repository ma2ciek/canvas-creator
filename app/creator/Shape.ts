import { extend } from './util';
import { IPoint } from './Point';
import { IRect } from './Rectangle';
import EventEmitter from './EventEmitter';

export interface IShapeOptions {
    x: number;
    y: number;
    draggable?: boolean;
}

export class Shape extends EventEmitter implements IShapeOptions {
    public x: number;
    public y: number;
    public draggable: boolean;

    constructor(options: IShapeOptions) {
        super();
        this.x = options.x;
        this.y = options.y;
        this.draggable = typeof options.draggable == 'boolean' ? options.draggable : true;
    }

    public moveBy(p: IPoint) {
        this.x += p.x;
        this.y += p.y;
    }

    public getBoundingRect() {
        new Error('you should override getBoundingRect method');
        return { x: 0, width: 0, y: 0, height: 0 }
    }

    public containsRect(rect: IRect) {
        new Error('you should override containsRect method');
        return false;
    }

    public contains(p: IPoint) {
        new Error('you should override contains method');
        return false;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        new Error('you should override draw method');
    }
}

export default Shape;