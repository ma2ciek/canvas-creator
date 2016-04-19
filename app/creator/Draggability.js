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
        define(["require", "exports", './EventEmitter', './CanvasDragger'], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventEmitter_1 = require('./EventEmitter');
    var CanvasDragger_1 = require('./CanvasDragger');
    var Draggability = (function (_super) {
        __extends(Draggability, _super);
        function Draggability(canvas, getInstance) {
            var _this = this;
            _super.call(this);
            var canvasDragger = new CanvasDragger_1.default(canvas);
            var mousePosition;
            canvasDragger.on('dragstart', function (point) {
                _this.active = getInstance(point);
                _this.active && _this.onDrag(_this.active);
                mousePosition = point;
            });
            canvasDragger.on('dragging', function (point) {
                _this.onDrag(_this.active);
                _this.active.moveBy(point.getSubtract(mousePosition));
                _this.afterDrag(_this.active);
                mousePosition = point;
            });
            canvasDragger.on('drop', function (point) {
                _this.active = null;
            });
        }
        Draggability.prototype.getAvtive = function () {
            return this.active;
        };
        Draggability.prototype.setActive = function (active) {
            this.active = active;
        };
        Draggability.prototype.onDrag = function (instance) {
            this.emit('dirt', instance.getBoundingRect());
            this.emit('maybeBringToForward', instance);
        };
        Draggability.prototype.afterDrag = function (instance) {
            this.emit('dirt', instance.getBoundingRect());
        };
        return Draggability;
    }(EventEmitter_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Draggability;
});
