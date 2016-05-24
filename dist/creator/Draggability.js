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
        define(["require", "exports", './utils/EventEmitter', './CanvasDragger'], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventEmitter_1 = require('./utils/EventEmitter');
    var CanvasDragger_1 = require('./CanvasDragger');
    var Draggability = (function (_super) {
        __extends(Draggability, _super);
        function Draggability(canvas, getInstance) {
            _super.call(this);
            this.getInstance = getInstance;
            var canvasDragger = new CanvasDragger_1.default(canvas);
            canvasDragger.on('dragstart', this.onDragStart.bind(this));
            canvasDragger.on('dragging', this.onDragging.bind(this));
            canvasDragger.on('drop', this.onDrop.bind(this));
        }
        Draggability.prototype.getAvtive = function () {
            return this.active;
        };
        Draggability.prototype.setActive = function (active) {
            this.active = active;
        };
        Draggability.prototype.onDragStart = function (point, e) {
            this.active = this.getInstance(point);
            this.mousePosition = point;
            if (!this.active)
                return;
            if (this.isSpecialKeyPressed(e))
                this.active.emit('dragstart', point);
            else {
                this.active.emit('click');
                this.active.emit('mouseDown');
                this.emit('dirt', this.active.getBoundingRect());
            }
        };
        Draggability.prototype.onDragging = function (point, e) {
            if (!this.active || !this.active.draggable)
                return;
            this.active.emit('mouseMove');
            if (this.isSpecialKeyPressed(e))
                this.active.emit('dragging', point);
            else {
                this.emit('dirt', this.active.getBoundingRect());
                this.active.moveBy(point.getSubtract(this.mousePosition));
                this.emit('dirt', this.active.getBoundingRect());
                this.mousePosition = point;
            }
        };
        Draggability.prototype.onDrop = function (point, e) {
            if (!this.active)
                return;
            if (this.isSpecialKeyPressed(e))
                this.active.emit('drop', point);
            else {
                this.active.emit('mouseUp');
                this.active = null;
            }
        };
        Draggability.prototype.isSpecialKeyPressed = function (e) {
            return e.which == 3;
        };
        return Draggability;
    }(EventEmitter_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Draggability;
});
