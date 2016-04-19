(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../../src/creator/Circle', 'assert'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Circle_1 = require('../../src/creator/Circle');
    var assert = require('assert');
    describe('Circle', function () {
        var circle;
        beforeEach(function () {
            circle = new Circle_1.default({
                x: 30,
                y: 10,
                radius: 50,
                color: 'white',
                draggable: true
            });
        });
        it('#constructor()', function () {
            assert.equal(circle.x, 30);
        });
    });
});
