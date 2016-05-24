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
        define(["require", "exports", './utils/EventEmitter', './utils/Point'], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventEmitter_1 = require('./utils/EventEmitter');
    var Point_1 = require('./utils/Point');
    var CanvasDragger = (function (_super) {
        __extends(CanvasDragger, _super);
        function CanvasDragger(container) {
            _super.call(this);
            this.container = container;
            this.mouseDown = false;
            this.eventListeners = {
                mousedown: this.onDragStart,
                mouseup: this.onDrop,
                mousemove: this.onDragging,
                mouseout: this.onDrop,
                contextmenu: this.preventDefault,
            };
            this.addEventListeners();
        }
        CanvasDragger.prototype.addEventListeners = function () {
            var _this = this;
            var ael = this.container.addEventListener;
            var _loop_1 = function() {
                var handler = this_1.eventListeners[eventName];
                ael(eventName, function (e) { return handler.call(_this, e); });
            };
            var this_1 = this;
            for (var eventName in this.eventListeners) {
                _loop_1();
            }
        };
        CanvasDragger.prototype.onDrop = function (e) {
            if (this.mouseDown)
                this.emit('drop', this.getPoint(e), e);
            this.mouseDown = false;
        };
        CanvasDragger.prototype.onDragging = function (e) {
            if (this.mouseDown)
                this.emit('dragging', this.getPoint(e), e);
        };
        CanvasDragger.prototype.onDragStart = function (e) {
            this.mouseDown = true;
            this.emit('dragstart', this.getPoint(e), e);
        };
        CanvasDragger.prototype.preventDefault = function (e) {
            e.preventDefault();
        };
        CanvasDragger.prototype.getPoint = function (e) {
            var rect = this.container.getBoundingClientRect();
            return new Point_1.default(e.clientX - rect.left, e.clientY - rect.top);
        };
        return CanvasDragger;
    }(EventEmitter_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CanvasDragger;
});
