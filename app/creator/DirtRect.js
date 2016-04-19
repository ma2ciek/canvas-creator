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
            this.clear();
        }
        DirtRect.prototype.add = function (params) {
            this.minX = Math.min(this.minX, params.x | 0);
            this.minY = Math.min(this.minY, params.y | 0);
            this.maxX = Math.max(this.maxX, params.x + params.width | 0);
            this.maxY = Math.max(this.maxY, params.y + params.height | 0);
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
            if (this.minX == Infinity)
                this.minX = 0;
            if (this.minY == Infinity)
                this.minY = 0;
            if (this.maxX == -Infinity)
                this.maxX = 0;
            if (this.maxY == -Infinity)
                this.maxX = 0;
        };
        DirtRect.prototype.createRect = function () {
            return {
                x: Math.max(this.minX, 0),
                y: Math.max(this.minY, 0),
                width: this.maxX - this.minX,
                height: this.maxY - this.minY
            };
        };
        return DirtRect;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DirtRect;
});
