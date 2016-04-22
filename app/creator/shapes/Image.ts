import { IRect} from './Rectangle';
import { Shape, IShape, IShapeOptions} from './Shape';
import { IPoint } from '../utils/Point';

export interface IImageOptions extends IShapeOptions {
    width?: number;
    height?: number;
    src: string;
}

export class _Image extends Shape implements IShape {
    public src: string;
    public el: HTMLImageElement;

    constructor(options: IImageOptions) {
        super(options);

        this.src = options.src;
        this.initialize();
    }

    private initialize(): void {
        this.el = new Image();
        this.el.onload = () => setTimeout(() => this.emit('loaded'));
        this.el.src = this.src;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (!this.el.width)
            return;

        ctx.drawImage(this.el, this.x, this.y, this.el.width, this.el.height);
    }

    public contains(p: IPoint): boolean {
        return this.x + this.el.width > p.x &&
            this.y + this.el.height > p.y &&
            this.x < p.x &&
            this.y < p.y;
    }

    public containsRect(rect: IRect): boolean {
        return this.x + this.el.width > rect.x &&
            this.y + this.el.height > rect.y &&
            this.x < rect.x + rect.width &&
            this.y < rect.y + rect.height;
    }

    public getBoundingRect(): IRect {
        return {
            x: this.x,
            y: this.y,
            width: this.el.width,
            height: this.el.height
        };
    }
}

export default _Image;