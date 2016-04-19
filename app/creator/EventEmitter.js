(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventEmitter = (function () {
        function EventEmitter() {
            this.__handlers = {};
        }
        EventEmitter.prototype.on = function (eventName, fn) {
            this.__handlers[eventName] ?
                this.__handlers[eventName].push(fn) :
                this.__handlers[eventName] = [fn];
        };
        EventEmitter.prototype.emit = function (eventName) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
            if (this.__handlers[eventName])
                this.__handlers[eventName].forEach(function (e) { return e.apply(void 0, data); });
        };
        return EventEmitter;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = EventEmitter;
});
