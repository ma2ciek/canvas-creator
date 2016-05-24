(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './MouseEventHandler', './config'], factory);
    }
})(function (require, exports) {
    "use strict";
    var MouseEventHandler_1 = require('./MouseEventHandler');
    var config_1 = require('./config');
    var Cursor = (function () {
        function Cursor(canvas, getCanvasObjectFromPosition) {
            this.canvas = canvas;
            this.getCanvasObjectFromPosition = getCanvasObjectFromPosition;
            this.meh = new MouseEventHandler_1.default(canvas);
            this.addEventListeners();
        }
        Cursor.prototype.addEventListeners = function () {
            var _this = this;
            this.meh.on('mouseMove', function (position) { return _this.updateCursor(position); });
            this.meh.on('mouseUp', function (position) { return _this.updateCursor(position); });
            this.meh.on('mouseOut', function () { return _this.restoreCursor(); });
            this.meh.on('dragging', function () { return _this.setDraggingCursor(); });
        };
        Cursor.prototype.updateCursor = function (position) {
            var elem = this.getCanvasObjectFromPosition(position);
            this.canvas.style.cursor = (elem) ? elem.cursor : config_1.CURSOR_DEFAULT;
        };
        Cursor.prototype.restoreCursor = function () {
            this.canvas.style.cursor = config_1.CURSOR_DEFAULT;
        };
        Cursor.prototype.setDraggingCursor = function () {
            this.canvas.style.cursor = config_1.CURSOR_DRAGGING;
        };
        return Cursor;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Cursor;
});
