(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './MouseEventHandler', './utils/Emitter'], factory);
    }
})(function (require, exports) {
    "use strict";
    var MouseEventHandler_1 = require('./MouseEventHandler');
    var Emitter_1 = require('./utils/Emitter');
    var MapMove = (function () {
        function MapMove(canvas, getCanvasObjectFromPosition) {
            this.canvas = canvas;
            this.getCanvasObjectFromPosition = getCanvasObjectFromPosition;
            this.onMoveEmitter = new Emitter_1.default();
            this.meh = new MouseEventHandler_1.default(canvas);
            this.addEventListeners();
        }
        MapMove.prototype.addEventListeners = function () {
            var _this = this;
            this.meh.on('mouseDown', function (point) {
                _this.object = _this.getCanvasObjectFromPosition(point);
                _this.lastPoint = point;
            });
            this.meh.on('dragging', function (point) {
                if (!_this.object || !_this.object.draggable) {
                    _this.onMoveEmitter.emit(_this.lastPoint.getSubtract(point));
                    _this.lastPoint = point;
                }
            });
            this.meh.on('mouseUp', function () {
                _this.lastPoint = null;
            });
            this.meh.on('mouseOut', function () {
                _this.lastPoint = null;
            });
        };
        return MapMove;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MapMove;
});
