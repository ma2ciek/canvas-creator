/// <reference path="../../typings/main.d.ts" />
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'assert', '../../app/creator/shapes/Circle'], factory);
    }
})(function (require, exports) {
    "use strict";
    var assert = require('assert');
    var Circle_1 = require('../../app/creator/shapes/Circle');
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
