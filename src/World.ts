import DirtRect from './DirtRect';
import Shape from './Shape';
import Draggability from './Draggability';

class World {

    dirtRect: DirtRect;
    instances: Shape[] = [];
    ctx: CanvasRenderingContext2D;

    add(instance: Shape) {
        this.instances.push(instance)
        this.dirtRect.add(instance.getBoundingRect());
    }

    constructor(canvas: HTMLCanvasElement, config) {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ctx = canvas.getContext('2d');

        var draggability = new Draggability(canvas, this.getInstance);

        draggability.on('dirt', rect => this.dirtRect.add(rect));
        draggability.on('maybeBringForward', object => {
            config.ontop && this.bringObjectForward(object);
        });
    }

    private bringObjectForward(object) {
        var index = this.instances.indexOf(object);
        this.instances.splice(index, 1);
        this.instances.push(object);
    }

    private draw() {
        var dirtRect = new DirtRect();

        var rect = dirtRect.get();

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(rect.x, rect.y, rect.width, rect.height);
        this.ctx.clip();
        this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);

        this.instances.forEach(i => i.containsRect(dirtRect.get()) && i.draw(this.ctx));

        this.ctx.restore();
        dirtRect.clear();

        requestAnimationFrame(() => this.draw());
    }

    private getInstance(x, y) {
        for (var i = this.instances.length - 1; i >= 0; i--) {
            var instance = this.instances[i];
            if (instance.draggable && instance.contains({ x, y })) {
                return instance;
            }
        }
        return null;
    }
}

export default {
    World,
    Shape,

}