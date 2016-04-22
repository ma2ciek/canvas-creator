import { Shape, IShape } from './Shape';
import { IPoint } from '../utils/Point';
import { IRect, Rectangle, IRectangleOptions } from './Rectangle';
import util from '../utils/util';

export interface ICellOptions extends IRectangleOptions {
    src: string;
} 

export interface ICell extends IShape { }

export default class Cell extends Rectangle implements ICell {
    public src: string;
    public offsetLeft = 0;
    public offsetTop = 0;
    
    private el: HTMLImageElement;

    constructor(options: ICellOptions) {
        super(options);
        
        this.src = options.src;
        this.initialize();
    }
    
    private initialize(): void {
        this.el = util.createImage(this.src, () => this.emit('loaded'))
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (!this.el.width)
            return;
            
        ctx.drawImage(this.el, 
            this.offsetLeft, this.offsetTop, this.width, this.height, 
            this.x, this.y, this.width, this.height);
    }
    
    public contains(p: IPoint): boolean {
        return this.x + this.width > p.x &&
            this.y + this.height > p.y &&
            this.x < p.x &&
            this.y < p.y;
    }

    public containsRect(rect: IRect): boolean {
        return this.x + this.width > rect.x &&
            this.y + this.height > rect.y &&
            this.x < rect.x + rect.width &&
            this.y < rect.y + rect.height;
    }
    
    public getBoundingRect(): IRect {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}