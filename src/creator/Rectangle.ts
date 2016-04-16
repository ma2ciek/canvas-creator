import { Shape, IShapeOptions} from './Shape';
import { IPoint } from './Point';

export interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface IRectangleOptions extends IShapeOptions {
    width: number;
    height: number;
}

export class Rectangle extends Shape {
    public width: number;
    public height: number;

    constructor(options: IRectangleOptions) {
        super(options);

        this.width = options.width;
        this.height = options.height;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    public contains(p: IPoint) {
        return this.x + this.width > p.x &&
            this.y + this.height > p.y &&
            this.x < p.x &&
            this.y < p.y;
    }

    public containsRect(rect: IRect) {
        return this.x + this.width > rect.x &&
            this.y + this.height > rect.y &&
            this.x < rect.x + rect.width &&
            this.y < rect.y + rect.height;
    }

    public getBoundingRect() {
        return <IRect> this;
    }
}

export default Rectangle;