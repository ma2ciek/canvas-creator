(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function seal(target, key, descriptor) {
        descriptor.configurable = false;
        return descriptor;
    }
    exports.seal = seal;
    function readonly(target, key, descriptor) {
        descriptor.writable = false;
        return descriptor;
    }
    exports.readonly = readonly;
    function log(target, key, descriptor) {
        return {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                console.log(target.constructor.name + '::' + key);
                for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                    var arg = args_1[_a];
                    console.log(arg);
                }
                descriptor.value.apply(this, args);
            }
        };
    }
    exports.log = log;
});
