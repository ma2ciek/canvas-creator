import { Shape, IShape } from './Shape';
import { Rectangle, IRectangleOptions } from './Rectangle';

export interface ICellOptions extends IRectangleOptions {
    src: string;
}

export default class Cell extends Rectangle implements IShape {
    width: number;
    height: number;
    src: string;
    
    constructor(options: ICellOptions) {
        super(options);
    }
}