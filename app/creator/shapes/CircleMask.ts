export default class CircleMask {

    public static start(ctx: CanvasRenderingContext2D, circle: ICircle) {
        ctx.beginPath();        
        ctx.save();        
        ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.clip();
    }
    
    public static end(ctx: CanvasRenderingContext2D) {
        ctx.restore();
    }
}

export interface ICircle {
    x: number;
    y: number;
    r: number;
}
