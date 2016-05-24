(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Emitter = (function () {
        function Emitter() {
            this.__callbacks = [];
        }
        Emitter.prototype.subscribe = function (fn) {
            this.__callbacks.push(fn);
        };
        Emitter.prototype.emit = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i - 0] = arguments[_i];
            }
            this.__callbacks.forEach(function (e) { return e.apply(void 0, data); });
        };
        Emitter.prototype.unsubscribe = function (fn) {
            this.__callbacks = this.__callbacks.filter(function (_fn) { return _fn != fn; });
        };
        Emitter.prototype.unsubscribeAll = function () {
            this.__callbacks = [];
        };
        Emitter.prototype.once = function (fn) {
            var _this = this;
            var wrapper = function () {
                _this.unsubscribe(wrapper);
                fn();
            };
            this.__callbacks.push(wrapper);
        };
        return Emitter;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Emitter;
});
