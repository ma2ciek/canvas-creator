import Shape from './Shape';
import EventEmitter from './EventEmitter';

export default class Draggability extends EventEmitter {
    constructor(
        canvas: HTMLCanvasElement,
        getInstance
    ) {
        super();
        let clickedInstance;
        const mousePosition = { x: 0, y: 0 };

        canvas.addEventListener('mousedown', e => {
            clickedInstance = getInstance(e.clientX, e.clientY);
            clickedInstance && this.onDrag(clickedInstance);
            e.preventDefault();
        });
        canvas.addEventListener('mouseup', e => {
            clickedInstance = undefined;
        });
        canvas.addEventListener('mousemove', e => {
            if (clickedInstance) {
                this.onDrag(clickedInstance);
                clickedInstance.move(e.clientX - mousePosition.x, e.clientY - mousePosition.y);
                this.afterDrag(clickedInstance)
            }
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
        });
        canvas.addEventListener('mouseout', e => {
            clickedInstance = false;
        });
    }
    private onDrag(instance: Shape) {
        this.emit('dirt', instance.getBoundingRect())
        this.emit('maybeBringToForward', instance);
    }

    private afterDrag(instance: Shape) {
        this.emit('dirt', instance.getBoundingRect())
    }
}
