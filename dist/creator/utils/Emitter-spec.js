(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './Emitter', 'assert'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Emitter_1 = require('./Emitter');
    var assert = require('assert');
    describe('Emitter', function () {
        var emitter;
        var x;
        var callback = function () { return x += 1; };
        var callback2 = function () { return x += 2; };
        beforeEach(function () {
            x = 0;
            emitter = new Emitter_1.default();
        });
        it('should add few subscribents', function () {
            emitter.subscribe(callback);
            emitter.subscribe(callback2);
            emitter.subscribe(callback2);
            emitter.emit();
            assert.equal(x, 5);
        });
        it('subscribe() should subscribe to all emits', function () {
            emitter.subscribe(callback);
            emitter.subscribe(callback2);
            emitter.emit();
            emitter.emit();
            assert.equal(x, 6);
        });
        it('should subscribe and unsubscribe', function () {
            emitter.subscribe(callback);
            emitter.unsubscribe(callback);
            emitter.emit();
            assert.equal(x, 0);
        });
        it('should remove few subscribents', function () {
            emitter.subscribe(callback);
            emitter.subscribe(callback2);
            emitter.subscribe(callback);
            emitter.unsubscribe(callback);
            emitter.emit();
            assert.equal(x, 2);
        });
        it('#unsubscribeAll()', function () {
            emitter.subscribe(callback);
            emitter.subscribe(callback2);
            emitter.subscribe(callback);
            emitter.unsubscribeAll();
            emitter.emit();
            assert.equal(x, 0);
        });
        it('#once()', function () {
            emitter.once(callback);
            emitter.emit();
            emitter.emit();
            assert.equal(x, 1);
        });
    });
});
