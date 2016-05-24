(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _global = global;
    var stubs = {
        requestAnimationFrame: function () { },
    };
    var mocks = {
        window: global
    };
    var makeGlobalsFactory = function (dictionary) { return function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i - 0] = arguments[_i];
        }
        for (var _a = 0, names_1 = names; _a < names_1.length; _a++) {
            var name_1 = names_1[_a];
            var object = dictionary[name_1];
            _global[name_1] = object;
        }
    }; };
    exports.makeStubs = makeGlobalsFactory(stubs);
    exports.makeMocks = makeGlobalsFactory(mocks);
});
