import { Rectangle, IRect, IRectangleOptions} from './Rectangle';
import { IPoint } from './Point';

export interface IImageOptions extends IRectangleOptions {
    src: string;
}

export class _Image extends Rectangle {
    public src: string;
    public htmlImage: HTMLImageElement;

    constructor(options: IImageOptions) {
        super(options);

        this.src = options.src;
        this.initialize();
    }

    private initialize() {
        this.htmlImage = new Image();
        this.htmlImage.onload = () => setTimeout(() => this.emit('loaded'));
        this.htmlImage.src = this.src;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.htmlImage.width > 0)
            ctx.drawImage(this.htmlImage, this.x, this.y, this.width, this.height);
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
        return <IRect>this;
    }
}

export default _Image;