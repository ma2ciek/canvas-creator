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
        define(["require", "exports", './Shape', '../utils/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Shape_1 = require('./Shape');
    var util_1 = require('../utils/util');
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image(options) {
            _super.call(this, options);
            this.type = 'image';
            this.src = options.src;
            this.initialize(options);
        }
        Image.prototype.initialize = function (options) {
            var _this = this;
            this.el = util_1.default.createImage(this.src, function () {
                _this.width = options.width || _this.el.width;
                _this.height = options.height || _this.el.height;
                _this.emit('dirt');
            });
        };
        Image.prototype.draw = function (ctx) {
            if (!this.el.width)
                return;
            ctx.drawImage(this.el, this.x, this.y, this.width, this.height);
        };
        Image.prototype.contains = function (p) {
            return this.x + this.width > p.x &&
                this.y + this.height > p.y &&
                this.x < p.x &&
                this.y < p.y;
        };
        Image.prototype.containsRect = function (rect) {
            return this.x + this.width > rect.x &&
                this.y + this.height > rect.y &&
                this.x < rect.x + rect.width &&
                this.y < rect.y + rect.height;
        };
        Image.prototype.getBoundingRect = function () {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            };
        };
        return Image;
    }(Shape_1.Shape));
    exports.Image = Image;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Image;
});
