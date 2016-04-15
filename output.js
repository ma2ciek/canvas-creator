'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
    var Shape = function () {
        function Shape(params) {
            _classCallCheck(this, Shape);

            this.x = params.x;
            this.y = params.y;
            this.color = params.color || '#000';
            this.draggable = !!params.draggable;
            this.zIndex = params.zIndex || 0;
        }

        _createClass(Shape, [{
            key: 'move',
            value: function move(x, y) {
                this.x += x;
                this.y += y;
            }
        }]);

        return Shape;
    }();

    var Rectangle = function (_Shape) {
        _inherits(Rectangle, _Shape);

        function Rectangle(params) {
            _classCallCheck(this, Rectangle);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rectangle).call(this, params));

            _this.width = params.width;
            _this.height = params.height;
            return _this;
        }

        _createClass(Rectangle, [{
            key: 'draw',
            value: function draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }, {
            key: 'contains',
            value: function contains(x, y) {
                return this.x + this.width > x && this.y + this.height > y && this.x < x && this.y < y;
            }
        }, {
            key: 'containsRect',
            value: function containsRect(x, y, w, h) {
                return this.x + this.width > x && this.y + this.height > y && this.x < x + w && this.y < y + h;
            }
        }, {
            key: 'getBoundingRect',
            value: function getBoundingRect() {
                return [this.x, this.y, this.width, this.height];
            }
        }]);

        return Rectangle;
    }(Shape);

    var Circle = function (_Shape2) {
        _inherits(Circle, _Shape2);

        function Circle(params) {
            _classCallCheck(this, Circle);

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Circle).call(this, params));

            _this2.radius = params.radius;
            return _this2;
        }

        _createClass(Circle, [{
            key: 'draw',
            value: function draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                ctx.fill();
            }
        }, {
            key: 'contains',
            value: function contains(x, y) {
                return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) <= this.radius * this.radius;
            }
        }, {
            key: 'containsRect',
            value: function containsRect(x, y, w, h) {
                return this.x + this.radius > x && this.y + this.radius > y && this.x - this.radius <= x + w && this.y - this.radius < y + h;
            }
        }, {
            key: 'getBoundingRect',
            value: function getBoundingRect() {
                return [this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2];
            }
        }]);

        return Circle;
    }(Shape);

    var DirtRect = function () {
        function DirtRect(x, y, w, h) {
            _classCallCheck(this, DirtRect);

            this.clear();
            this.add(x, y, w, h);
        }

        _createClass(DirtRect, [{
            key: 'add',
            value: function add(x, y, w, h) {
                this._minX = Math.min(this._minX, x | 0);
                this._minY = Math.min(this._minY, y | 0);
                this._maxX = Math.max(this._maxX, x + w | 0);
                this._maxY = Math.max(this._maxY, y + h | 0);
            }
        }, {
            key: 'clear',
            value: function clear() {
                this._minX = Infinity;
                this._minY = Infinity;
                this._maxX = 0;
                this._maxY = 0;
            }
        }, {
            key: 'get',
            value: function get() {
                if (this._minX == Infinity) this._minX = 0;
                if (this._minY == Infinity) this._minY = 0;

                return [Math.max(this._minX, 0), Math.max(this._minY, 0), this._maxX - this._minX, this._maxY - this._minY];
            }
        }]);

        return DirtRect;
    }();

    function handleDragging(canvas, getInstance, onDrag, afterDrag) {

        var clickedInstance;
        var mousePosition = { x: 0, y: 0 };
        canvas.addEventListener('mousedown', function (e) {
            clickedInstance = getInstance(e.clientX, e.clientY);
            clickedInstance && onDrag(clickedInstance);
            e.preventDefault();
        });
        canvas.addEventListener('mouseup', function (e) {
            clickedInstance = undefined;
        });
        canvas.addEventListener('mousemove', function (e) {
            if (clickedInstance) {
                onDrag(clickedInstance);
                clickedInstance.move(e.clientX - mousePosition.x, e.clientY - mousePosition.y);
                afterDrag && afterDrag(clickedInstance);
            }
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
        });
        canvas.addEventListener('mouseout', function (e) {
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
            instances.push(instance);
            dirtRect.add.apply(dirtRect, _toConsumableArray(instance.getBoundingRect()));
        }

        (function draw() {
            var drawingRect = dirtRect.get();

            ctx.save();
            ctx.beginPath();
            ctx.rect.apply(ctx, _toConsumableArray(drawingRect));
            ctx.clip();
            ctx.clearRect.apply(ctx, _toConsumableArray(drawingRect));

            instances.forEach(function (i) {
                return i.containsRect.apply(i, _toConsumableArray(drawingRect)) && i.draw(ctx);
            });

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
            dirtRect.add.apply(dirtRect, _toConsumableArray(instance.getBoundingRect()));

            if (config.ontop) {
                var index = instances.indexOf(instance);
                instances.splice(index, 1);
                instances.push(instance);
            }
        }

        function afterDrag(instance) {
            dirtRect.add.apply(dirtRect, _toConsumableArray(instance.getBoundingRect()));
        }

        return {
            add: add,
            Rectangle: Rectangle,
            Circle: Circle
        };
    };
}();
window.onload = init;

function init() {

    var canvas = document.querySelector('canvas');
    var world = World(canvas, {
        ontop: false
    });

    var randomColor = function randomColor() {
        var c = function c() {
            return Math.random() * 256 | 0;
        };
        return 'rgb( ' + c() + ', ' + c() + ', ' + c() + ')';
    };

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
//# sourceMappingURL=output.js.map
