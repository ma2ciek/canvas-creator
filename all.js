var World = (function () {

    class Shape {
        constructor(params) {
            this.x = params.x;
            this.y = params.y;
            this.color = params.color || '#000';
            this.draggable = !!params.draggable;
            this.zIndex = params.zIndex || 0;
        }
        move(x, y) {
            this.x += x;
            this.y += y;
        };
    }

    class Rectangle extends Shape {
        constructor(params) {
            super(params);
            this.width = params.width;
            this.height = params.height;
        }
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        contains(x, y) {
            return this.x + this.width > x && this.y + this.height > y && this.x < x && this.y < y;
        }
        containsRect(x, y, w, h) {
            return this.x + this.width > x && this.y + this.height > y && this.x < x + w && this.y < y + h;
        }
        getBoundingRect() {
            return [
                this.x,
                this.y,
                this.width,
                this.height
            ]
        }
    }

    class Circle extends Shape {
        constructor(params) {
            super(params);
            this.radius = params.radius;
        }
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }
        contains(x, y) {
            return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) <= this.radius * this.radius;
        }
        containsRect(x, y, w, h) {
            return this.x + this.radius > x && this.y + this.radius > y && this.x - this.radius <= x + w && this.y - this.radius < y + h;
        }
        getBoundingRect() {
            return [
                this.x - this.radius,
                this.y - this.radius,
                this.radius * 2,
                this.radius * 2
            ]
        }
    }
    class DirtRect {

        constructor(x, y, w, h) {
            this.clear();
            this.add(x, y, w, h);
        }

        add(x, y, w, h) {
            this._minX = Math.min(this._minX, x | 0);
            this._minY = Math.min(this._minY, y | 0);
            this._maxX = Math.max(this._maxX, x + w | 0);
            this._maxY = Math.max(this._maxY, y + h | 0);
        };


        clear() {
            this._minX = Infinity;
            this._minY = Infinity;
            this._maxX = 0;
            this._maxY = 0;
        };

        get() {
            if (this._minX == Infinity)
                this._minX = 0;
            if (this._minY == Infinity)
                this._minY = 0;

            return [
                Math.max(this._minX, 0),
                Math.max(this._minY, 0),
                this._maxX - this._minX,
                this._maxY - this._minY
            ];
        };
    }

    function handleDragging(canvas, getInstance, onDrag, afterDrag) {

        var clickedInstance;
        var mousePosition = { x: 0, y: 0 };
        canvas.addEventListener('mousedown', e => {
            clickedInstance = getInstance(e.clientX, e.clientY);
            clickedInstance && onDrag(clickedInstance);
            e.preventDefault();
        });
        canvas.addEventListener('mouseup', e => {
            clickedInstance = undefined;
        });
        canvas.addEventListener('mousemove', e => {
            if (clickedInstance) {
                onDrag(clickedInstance);
                clickedInstance.move(e.clientX - mousePosition.x, e.clientY - mousePosition.y);
                afterDrag && afterDrag(clickedInstance)
            }
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
        });
        canvas.addEventListener('mouseout', e => {
            clickedInstance = false;
        });
    }

    return function World(canvas, config) {
        var instances = [];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext('2d');

        var dirtRect = new DirtRect();

        function add(instance) {
            instances.push(instance)
            dirtRect.add(...instance.getBoundingRect());
        }

        (function draw() {
            var drawingRect = dirtRect.get();

            ctx.save();
            ctx.beginPath();
            ctx.rect(...drawingRect);
            ctx.clip();
            ctx.clearRect(...drawingRect);

            instances.forEach(i => i.containsRect(...drawingRect) && i.draw(ctx));

            ctx.restore();
            dirtRect.clear();
            requestAnimationFrame(draw);
        })();

        handleDragging(canvas, getInstance, onDrag, afterDrag);

        function getInstance(x, y) {
            for (var i = instances.length - 1; i >= 0; i--) {
                var instance = instances[i];
                if (instance.draggable && instance.contains(x, y)) {
                    return instance;
                }
            }
            return undefined;
        }

        function onDrag(instance) {
            dirtRect.add(...instance.getBoundingRect());

            if (config.ontop) {
                var index = instances.indexOf(instance);
                instances.splice(index, 1);
                instances.push(instance);
            }
        }

        function afterDrag(instance) {
            dirtRect.add(...instance.getBoundingRect());
        }

        return {
            add,
            Rectangle,
            Circle
        }
    }
})();
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