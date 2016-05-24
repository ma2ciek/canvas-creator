(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.getDistance = function (p) {
            return Math.sqrt(this.squareDistance(p));
        };
        Point.prototype.squareDistance = function (p) {
            return (this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y);
        };
        Point.prototype.add = function (p) {
            this.x += p.x;
            this.y += p.y;
        };
        Point.prototype.subtract = function (p) {
            this.x -= p.x;
            this.y -= p.y;
        };
        Point.prototype.getSubtract = function (p) {
            return new Point(this.x - p.x, this.y - p.y);
        };
        Point.prototype.set = function (p) {
            this.x = p.x;
            this.y = p.y;
        };
        Point.create = function (p) {
            return new Point(p.x, p.y);
        };
        return Point;
    }());
    exports.Point = Point;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Point;
});
