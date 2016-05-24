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
        define(["require", "exports", '../utils/EventEmitter', '../config'], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventEmitter_1 = require('../utils/EventEmitter');
    var config_1 = require('../config');
    var defaultTrue = function (x) { return typeof x == 'boolean' ? x : true; };
    var Shape = (function (_super) {
        __extends(Shape, _super);
        function Shape(options) {
            _super.call(this);
            this.x = options.x;
            this.y = options.y;
            this.draggable = !!options.draggable; // Default is false.
            this.selectable = defaultTrue(options.selectable);
            this.cursor = options.cursor || config_1.CURSOR_DEFAULT;
        }
        Shape.prototype.moveBy = function (p) {
            this.x += p.x;
            this.y += p.y;
        };
        return Shape;
    }(EventEmitter_1.default));
    exports.Shape = Shape;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Shape;
});
