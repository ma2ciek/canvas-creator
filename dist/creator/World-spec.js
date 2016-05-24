(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'assert', 'canvas', './World', './unit-tests-utils'], factory);
    }
})(function (require, exports) {
    "use strict";
    var assert = require('assert');
    var Canvas = require('canvas');
    var World_1 = require('./World');
    var unit_tests_utils_1 = require('./unit-tests-utils');
    unit_tests_utils_1.makeStubs('requestAnimationFrame');
    unit_tests_utils_1.makeMocks('window');
    describe('World', function () {
        var world;
        var canvas;
        beforeEach(function () {
            canvas = new Canvas(500, 500);
            canvas.addEventListener = function () { };
            world = new World_1.default(canvas, {
                width: 500,
                height: 500
            });
        });
        describe('#constructor()', function () {
            it('should conifgure canvas', function () {
                assert.equal(canvas.width, 500);
                assert.equal(canvas.height, 500);
            });
        });
    });
});
