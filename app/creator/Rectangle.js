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
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(options) {
            _super.call(this, options);
            this.width = options.width;
            this.height = options.height;
        }
        Rectangle.prototype.draw = function (ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        Rectangle.prototype.contains = function (p) {
            return this.x + this.width > p.x &&
                this.y + this.height > p.y &&
                this.x < p.x &&
                this.y < p.y;
        };
        Rectangle.prototype.containsRect = function (rect) {
            return this.x + this.width > rect.x &&
                this.y + this.height > rect.y &&
                this.x < rect.x + rect.width &&
                this.y < rect.y + rect.height;
        };
        Rectangle.prototype.getBoundingRect = function () {
            return this;
        };
        return Rectangle;
    }(Shape_1.Shape));
    exports.Rectangle = Rectangle;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Rectangle;
});
