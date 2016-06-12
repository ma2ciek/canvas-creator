import * as creator from '../creator/Core';

window.onload = () => {
    demo();
};

const randomColor = () => {
    return '#' + ('00000' + (Math.random() * 16777216 | 0).toString(16)).substr(-6);
};

function demo() {
    const canvas = <HTMLCanvasElement>document.querySelector('canvas');

    const world = new creator.World(canvas, {
        autoResize: true,
        mapMove: true,
    });

    for (let i = 0; i < 1000; i++) {
        const circle = new creator.Circle({
            x: Math.random() * canvas.width | 0,
            y: Math.random() * canvas.height | 0,
            radius: 80,
            draggable: true,
            color: randomColor(),
        });
        world.add(circle);

        const rect = new creator.Rectangle({
            x: Math.random() * canvas.width | 0,
            y: Math.random() * canvas.height | 0,
            width: 100,
            height: 80,
            draggable: true,
            color: randomColor(),
        });
        world.add(rect);

        world.add(new creator.Cell({
            src: 'app/demo/img/tapeta.jpg',
            x: Math.random() * canvas.width | 0,
            y: Math.random() * canvas.height | 0,
            width: 300,
            height: 300,
            draggable: true,
        }));
    }
}
