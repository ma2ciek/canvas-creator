(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var LayerManager = (function () {
        function LayerManager() {
            this.layers = [];
        }
        LayerManager.prototype.add = function (object, position) {
            typeof position == 'undefined' ?
                this.layers.push(object) :
                this.layers.splice(position, 0, object);
        };
        // todo: not working?
        LayerManager.prototype.bringObjectForward = function (object) {
            var index = this.layers.indexOf(object);
            this.layers.splice(index, 1);
            this.layers.push(object);
        };
        LayerManager.prototype.each = function (fn) {
            var len = this.layers.length;
            for (var i = 0; i < len; i++)
                fn(this.layers[i], i, this.layers);
        };
        LayerManager.prototype.get = function (index) {
            return this.layers[index];
        };
        return LayerManager;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = LayerManager;
});
