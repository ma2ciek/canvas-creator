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
        define(["require", "exports", '../utils/Point', './Rectangle', '../utils/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Point_1 = require('../utils/Point');
    var Rectangle_1 = require('./Rectangle');
    var util_1 = require('../utils/util');
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell(options) {
            _super.call(this, options);
            this.offset = new Point_1.default(0, 0);
            this.mask = options.mask;
            this.src = options.src;
            this.initialize();
        }
        Cell.prototype.initialize = function () {
            var _this = this;
            this.el = util_1.default.createImage(this.src, function () { return _this.emit('dirt'); });
            this.on('dragstart', this.dragStart.bind(this));
            this.on('dragging', this.move.bind(this));
            this.on('drop', this.correctOffset.bind(this));
        };
        Cell.prototype.dragStart = function (point, e) {
            this.startPoint = point;
        };
        Cell.prototype.move = function (point) {
            this.offset.add(this.startPoint.getSubtract(point));
            this.startPoint = point;
            this.emit('dirt');
        };
        Cell.prototype.correctOffset = function () {
            this.offset.x = util_1.default.normalize(this.offset.x, 0, this.el.width - this.width);
            this.offset.y = util_1.default.normalize(this.offset.y, 0, this.el.height - this.height);
            this.emit('dirt');
        };
        Cell.prototype.draw = function (ctx) {
            if (!this.el.width)
                return;
            this.mask && this.mask(ctx, {
                x: this.x + this.width / 2,
                y: this.y + this.height / 2,
                r: Math.min(this.width / 2, this.height / 2)
            });
            ctx.drawImage(this.el, this.offset.x, this.offset.y, this.width, this.height, this.x, this.y, this.width, this.height);
            this.mask && ctx.restore();
        };
        Cell.prototype.addImage = function (src) {
            var _this = this;
            this.src = src;
            this.el = util_1.default.createImage(src, function () { return _this.emit('dirt'); });
        };
        return Cell;
    }(Rectangle_1.Rectangle));
    exports.Cell = Cell;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Cell;
});
