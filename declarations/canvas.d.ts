declare namespace Canvas { }

declare class Canvas extends HTMLCanvasElement {
    new(width?: number, Theight?: number): HTMLCanvasElement;
    constructor(width?: number, height?: number);
}

declare module "canvas" {
    export = Canvas
}
