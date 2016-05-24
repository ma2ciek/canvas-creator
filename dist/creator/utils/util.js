(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function extend(dest) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
            var src = sources_1[_a];
            for (var propName in src) {
                if (src.hasOwnProperty(propName)) {
                    dest[propName] = src[propName];
                }
            }
        }
    }
    exports.extend = extend;
    ;
    function createImage(src, callback) {
        var img = new Image();
        img.onload = function () { return callback(img); };
        img.onerror = function () {
            console.error('cannot load image: ', src);
            callback(img);
        };
        img.src = src;
        return img;
    }
    exports.createImage = createImage;
    function normalize(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    exports.normalize = normalize;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        normalize: normalize,
        extend: extend,
        createImage: createImage
    };
});
