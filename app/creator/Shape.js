(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require('./util');
    var Shape = (function () {
        function Shape(params) {
            util_1.extend(this, params);
        }
        Shape.prototype.moveBy = function (p) {
            this.x += p.x;
            this.y += p.y;
        };
        Shape.prototype.getBoundingRect = function () {
            new Error('you should override getBoundingRect method');
            return { x: 0, width: 0, y: 0, height: 0 };
        };
        Shape.prototype.containsRect = function (rect) {
            new Error('you should override containsRect method');
            return false;
        };
        Shape.prototype.contains = function (p) {
            new Error('you should override contains method');
            return false;
        };
        Shape.prototype.draw = function (ctx) {
            new Error('you should override draw method');
        };
        return Shape;
    }());
    exports.Shape = Shape;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Shape;
});
