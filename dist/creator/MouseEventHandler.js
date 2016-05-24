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
    var MouseEventHandler = (function (_super) {
        __extends(MouseEventHandler, _super);
        function MouseEventHandler(container) {
            _super.call(this);
            this.container = container;
            this.isMouseDown = false;
            this.eventListeners = {
                mousedown: this.onMouseDown,
                mouseup: this.onMouseUp,
                mousemove: this.onMouseMove,
                mouseout: this.onMouseOut,
            };
            this.addEventListeners();
        }
        MouseEventHandler.prototype.addEventListeners = function () {
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
        MouseEventHandler.prototype.onMouseDown = function (e) {
            this.isMouseDown = true;
            this.emit('mouseDown', this.getPoint(e), e);
        };
        MouseEventHandler.prototype.onMouseOut = function (e) {
            this.isMouseDown = false;
            this.emit('mouseOut', this.getPoint(e), e);
        };
        MouseEventHandler.prototype.onMouseMove = function (e) {
            this.isMouseDown ?
                this.emit('dragging', this.getPoint(e), e) :
                this.emit('mouseMove', this.getPoint(e), e);
        };
        MouseEventHandler.prototype.onMouseUp = function (e) {
            this.isMouseDown = false;
            this.emit('mouseUp', this.getPoint(e), e);
        };
        MouseEventHandler.prototype.getPoint = function (e) {
            var rect = this.container.getBoundingClientRect();
            return new Point_1.default(e.clientX - rect.left, e.clientY - rect.top);
        };
        return MouseEventHandler;
    }(EventEmitter_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MouseEventHandler;
});
