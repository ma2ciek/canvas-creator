import { extend } from './util';
import { IPoint } from './Point';
import { IRect } from './Rectangle';

export interface IShapeOptions {
    x: number;
    y: number;
    color: string;
    draggable: boolean;
    zIndex: number;
}

export class Shape implements IShapeOptions {
    x: number;
    y: number;
    color: string;
    draggable: boolean;
    zIndex: number;

    constructor(params: IShapeOptions) {
        extend(this, params);
    }

    move(p: IPoint) {
        this.x = p.x;
        this.y = p.y;
    }

    getBoundingRect() {
        new Error('you should override getBoundingRect method');
        return { x: 0, width: 0, y: 0, height: 0 }
    }

    containsRect(rect: IRect) {
        new Error('you should override containsRect method');
        return false;
    }

    contains(p: IPoint) {
        new Error('you should override contains method');
        return false;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        new Error('you should override draw method');
    }
}

export default Shape;