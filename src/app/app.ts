import * as creator from '../creator/Core';

var canvas = <HTMLCanvasElement> document.querySelector('canvas');
var world = new creator.World(canvas, {
    ontop: true
});

var randomColor = () => {
    var c = () => Math.random() * 256 | 0;
    return `rgb( ${c()}, ${c()}, ${c()})`;
}

for (var i = 0; i < 1000; i++) {
    var circle = new creator.Circle({
        x: Math.random() * canvas.width | 0,
        y: Math.random() * canvas.height | 0,
        radius: 80,
        draggable: true,
        color: randomColor()
    });
    world.add(circle);
    
    // var rect = new creator.Rectangle({
    //     x: Math.random() * canvas.width | 0,
    //     y: Math.random() * canvas.height | 0,
    //     width: 100,
    //     height: 80,
    //     draggable: true,
    //     color: randomColor()
    // });
    // world.add(rect);
}