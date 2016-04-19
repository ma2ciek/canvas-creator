(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../creator/Core', '../creator/logger'], factory);
    }
})(function (require, exports) {
    "use strict";
    var creator = require('../creator/Core');
    var logger_1 = require('../creator/logger');
    var canvas = document.querySelector('canvas');
    var world = new creator.World(canvas, {
        ontop: true
    });
    var randomColor = function () {
        var c = function () { return Math.random() * 256 | 0; };
        return "rgb( " + c() + ", " + c() + ", " + c() + ")";
    };
    console.time('rendering all');
    for (var i = 0; i < 10000; i++) {
        var circle = new creator.Circle({
            x: Math.random() * canvas.width | 0,
            y: Math.random() * canvas.height | 0,
            radius: 80,
            draggable: true,
            color: randomColor()
        });
        world.add(circle);
    }
    console.timeEnd('rendering all');
    window.world = world;
    window.logger = logger_1.default;
});