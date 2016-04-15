window.onload = init;

function init() {

    var canvas = document.querySelector('canvas');
    var world = World(canvas, {
        ontop: false
    });

    var randomColor = () => {
        var c = () => Math.random() * 256 | 0;
        return `rgb( ${ c() }, ${ c() }, ${ c() })`;
    }

    for (var i = 0; i < 10; i++) {
        var circle = new world.Circle({
            x: Math.random() * canvas.width | 0,
            y: Math.random() * canvas.height | 0,
            radius: 80,
            draggable: true,
            color: randomColor()
        });
        world.add(circle);
        var rect = new world.Rectangle({
            x: Math.random() * canvas.width | 0,
            y: Math.random() * canvas.height | 0,
            width: 100,
            height: 80,
            draggable: true,
            color: randomColor()
        });
        world.add(rect);
    }
}