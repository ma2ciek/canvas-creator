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
        define(["require", "exports", './EventEmitter', './Point'], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventEmitter_1 = require('./EventEmitter');
    var Point_1 = require('./Point');
    var CanvasDragger = (function (_super) {
        __extends(CanvasDragger, _super);
        function CanvasDragger(canvas) {
            _super.call(this);
            this.canvas = canvas;
            this.mouseDown = false;
            this.addEventListeners();
        }
        CanvasDragger.prototype.addEventListeners = function () {
            var _this = this;
            this.canvas.addEventListener('mousedown', function (e) { return e.which == 1 && _this.onMouseDown(e); });
            this.canvas.addEventListener('mouseup', function (e) { return e.which == 1 && _this.onMouseUp(e); });
            this.canvas.addEventListener('mousemove', function (e) { return e.which == 1 && _this.onMouseMove(e); });
            this.canvas.addEventListener('mouseout', function (e) { return e.which == 1 && _this.onMouseOut(e); });
            this.canvas.addEventListener('contextmenu', function (e) { return e.preventDefault(); });
        };
        CanvasDragger.prototype.onMouseUp = function (e) {
            if (this.mouseDown)
                this.emit('drop', new Point_1.default(e.clientX, e.clientY));
            this.mouseDown = false;
        };
        CanvasDragger.prototype.onMouseOut = function (e) {
            if (this.mouseDown)
                this.emit('drop', new Point_1.default(e.clientX, e.clientY));
            this.mouseDown = false;
        };
        CanvasDragger.prototype.onMouseMove = function (e) {
            if (this.mouseDown) {
                this.emit('dragging', new Point_1.default(e.clientX, e.clientY));
            }
        };
        CanvasDragger.prototype.onMouseDown = function (e) {
            this.mouseDown = true;
            this.emit('dragstart', new Point_1.default(e.clientX, e.clientY));
        };
        return CanvasDragger;
    }(EventEmitter_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CanvasDragger;
});
