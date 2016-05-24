var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './Shape'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Shape_1 = require('./Shape');
    var sqrt = Math.sqrt;
    var pow2 = function (x) { return Math.pow(x, 2); };
    var Circle = (function (_super) {
        __extends(Circle, _super);
        function Circle(options) {
            _super.call(this, options);
            this.type = 'circle';
            this.radius = options.radius;
            this.color = options.color;
        }
        Circle.prototype.draw = function (ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        };
        Circle.prototype.contains = function (p) {
            return pow2(this.x - p.x) + pow2(this.y - p.y) <= pow2(this.radius);
        };
        Circle.prototype.containsRect = function (rect) {
            return this.x + this.radius > rect.x &&
                this.y + this.radius > rect.y &&
                this.x - this.radius <= rect.x + rect.width &&
                this.y - this.radius < rect.y + rect.height;
        };
        Circle.prototype.getBoundingRect = function () {
            return {
                x: this.x - this.radius,
                y: this.y - this.radius,
                width: this.radius * 2,
                height: this.radius * 2
            };
        };
        return Circle;
    }(Shape_1.Shape));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Circle;
});
