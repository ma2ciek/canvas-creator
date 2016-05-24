(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var DirtRect = (function () {
        function DirtRect() {
            this.view = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            };
            this.clear();
        }
        DirtRect.prototype.updateDimensions = function (width, height) {
            this.view.width = width;
            this.view.height = height;
            this.dirtAll();
        };
        DirtRect.prototype.updatePosition = function (p) {
            this.view.x = p.x;
            this.view.y = p.y;
        };
        DirtRect.prototype.dirtAll = function () {
            this.add(this.view);
        };
        DirtRect.prototype.add = function (rect) {
            this.minX = Math.min(this.minX, rect.x);
            this.minY = Math.min(this.minY, rect.y);
            this.maxX = Math.max(this.maxX, rect.x + rect.width);
            this.maxY = Math.max(this.maxY, rect.y + rect.height);
        };
        DirtRect.prototype.clear = function () {
            this.minX = Infinity;
            this.minY = Infinity;
            this.maxX = -Infinity;
            this.maxY = -Infinity;
        };
        DirtRect.prototype.get = function () {
            this.normalizeValues();
            return this.createRect();
        };
        DirtRect.prototype.normalizeValues = function () {
            this.minX = Math.max(this.minX, this.view.x);
            this.minY = Math.max(this.minY, this.view.y);
            this.maxX = Math.min(this.maxX, this.view.x + this.view.width);
            this.maxY = Math.min(this.maxY, this.view.y + this.view.height);
        };
        DirtRect.prototype.createRect = function () {
            return {
                x: this.minX,
                y: this.minY,
                width: this.maxX - this.minX,
                height: this.maxY - this.minY
            };
        };
        return DirtRect;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DirtRect;
});
