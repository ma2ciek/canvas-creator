import * as creator from '../creator/Core';
import logger from '../creator/utils/logger';

var canvas = <HTMLCanvasElement>document.querySelector('canvas');
var world = new creator.World(canvas);

var randomColor = () => {
    var c = () => Math.random() * 256 | 0;
    return `rgb( ${c()}, ${c()}, ${c()})`;
}

for (var i = 0; i < 10; i++) {
    // var circle = new creator.Circle({
    //     x: Math.random() * canvas.width | 0,
    //     y: Math.random() * canvas.height | 0,
    //     radius: 80,
    //     draggable: true,
    //     color: randomColor()
    // });
    // world.add(circle);

    // var rect = new creator.Rectangle({
    //     x: Math.random() * canvas.width | 0,
    //     y: Math.random() * canvas.height | 0,
    //     width: 100,
    //     height: 80,
    //     draggable: true,
    //     color: randomColor()
    // });
    // world.add(rect);

    world.add(new creator.Cell({
        src: 'app/demo/img/tapeta.jpg',
        x: Math.random() * canvas.width | 0,
        y: Math.random() * canvas.height | 0,
        width: 300,
        height: 300
    }));
    
    world.add(new creator.Cell({
        mask: creator.circleMask,
        src: 'app/demo/img/tapeta2.jpg',
        x: Math.random() * canvas.width | 0,
        y: Math.random() * canvas.height | 0,
        width: 300,
        height: 300
    }));
}