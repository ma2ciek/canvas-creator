(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './utils/Point', './utils/Emitter'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Point_1 = require('./utils/Point');
    var Emitter_1 = require('./utils/Emitter');
    var CanvasPosition = (function () {
        function CanvasPosition(canvas, config) {
            this.canvas = canvas;
            this.config = config;
            this.positionEmitter = new Emitter_1.default();
            this.dimensionEmitter = new Emitter_1.default();
            this.position = new Point_1.Point(0, 0);
            this.setCanvasDimensions(config);
        }
        CanvasPosition.prototype.setCanvasDimensions = function (config) {
            var _this = this;
            if (config.autoResize) {
                this.fixCanvasSize();
                setTimeout(function () { return _this.fixCanvasSize(); }, 0);
                window.addEventListener('resize', function () { return _this.fixCanvasSize(); });
            }
            else {
                this.canvas.width = config.width;
                this.canvas.height = config.height;
            }
        };
        CanvasPosition.prototype.canvasToWorld = function (p) {
            return {
                x: p.x + this.position.x,
                y: p.y + this.position.y
            };
        };
        CanvasPosition.prototype.worldToCanvas = function (p) {
            return {
                x: p.x - this.position.x,
                y: p.y - this.position.y
            };
        };
        CanvasPosition.prototype.moveToPoint = function (p) {
            this.position.set({
                x: p.x - this.canvas.width / 2,
                y: p.y - this.canvas.height / 2
            });
            this.positionEmitter.emit(this.position);
        };
        CanvasPosition.prototype.moveBy = function (vector) {
            this.position.add(vector);
            this.positionEmitter.emit(this.position);
        };
        CanvasPosition.prototype.get = function () {
            return this.position;
        };
        CanvasPosition.prototype.fixCanvasSize = function () {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.dimensionEmitter.emit(window.innerWidth, window.innerHeight);
        };
        return CanvasPosition;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CanvasPosition;
});
