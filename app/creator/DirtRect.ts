import { IRect } from './Rectangle';

export default class DirtRect {

    private minX: number;
    private maxX: number;
    private minY: number;
    private maxY: number;

    constructor() {
        this.clear();
    }

    public add(params: IRect) {
        this.minX = Math.min(this.minX, params.x | 0);
        this.minY = Math.min(this.minY, params.y | 0);
        this.maxX = Math.max(this.maxX, params.x + params.width | 0);
        this.maxY = Math.max(this.maxY, params.y + params.height | 0);
    }

    public clear() {
        this.minX = Infinity;
        this.minY = Infinity;
        this.maxX = -Infinity;
        this.maxY = -Infinity;
    }

    public get(): IRect {
        this.normalizeValues();
        return this.createRect();      
    }

    private normalizeValues() {
        if (this.minX == Infinity)
            this.minX = 0;
        if (this.minY == Infinity)
            this.minY = 0;
        if (this.maxX == -Infinity)
            this.maxX = 0;
        if (this.maxY == -Infinity)
            this.maxX = 0;
    }
    
    private createRect() {
        return {
            x: Math.max(this.minX, 0),
            y: Math.max(this.minY, 0),
            width: this.maxX - this.minX,
            height: this.maxY - this.minY
        };
    }
}