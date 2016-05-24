(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var logger;
    (function (logger) {
        var frames = {};
        var max = 50;
        function getMs(name) {
            return (get(name) | 0) + 'ms';
        }
        logger.getMs = getMs;
        function getFPS(name) {
            return 1000 / get(name) | 0;
        }
        logger.getFPS = getFPS;
        function get(name) {
            return frames[name].reduce(function (a, b) { return a + b; }) / frames[name].length;
        }
        function frameStart(name) {
            if (!frames[name])
                frames[name] = [];
            var frame = frames[name];
            frame.push(-performance.now());
            if (frame.length > max)
                frame.shift();
        }
        logger.frameStart = frameStart;
        function frameEnd(name) {
            var frame = frames[name];
            if (!frame)
                frames[name] = [];
            frame[frame.length - 1] += performance.now();
        }
        logger.frameEnd = frameEnd;
    })(logger || (logger = {}));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = logger;
});
