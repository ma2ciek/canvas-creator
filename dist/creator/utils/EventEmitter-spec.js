(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'assert', './EventEmitter'], factory);
    }
})(function (require, exports) {
    "use strict";
    var assert = require('assert');
    var EventEmitter_1 = require('./EventEmitter');
    describe('EventEmitter', function () {
        var eventEmitter;
        beforeEach(function () {
            eventEmitter = new EventEmitter_1.default();
        });
        it('should add event listener and then fire it', function (done) {
            var firstCallback = done;
            eventEmitter.on('test', firstCallback);
            eventEmitter.emit('test');
        });
        it('should fire events in proper order', function () {
            var result = 0;
            var firstCallback = function () { return result += 10; };
            var secondCallback = function () { return result *= 2; };
            eventEmitter.on('test', firstCallback);
            eventEmitter.on('test', secondCallback);
            eventEmitter.emit('test');
            assert.equal(result, (0 + 10) * 2);
        });
        it('should not fire if the event name is different', function () {
            var wrongCallback = function () { throw new Error("shouldn't throw this"); };
            eventEmitter.on('correct', function () { });
            eventEmitter.on('bad', wrongCallback);
            eventEmitter.emit('correct');
        });
    });
});
