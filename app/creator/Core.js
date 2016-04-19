(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './World', './Circle', './Rectangle'], factory);
    }
})(function (require, exports) {
    "use strict";
    var World_1 = require('./World');
    var Circle_1 = require('./Circle');
    var Rectangle_1 = require('./Rectangle');
    exports.World = World_1.default;
    exports.Circle = Circle_1.default;
    exports.Rectangle = Rectangle_1.default;
});
