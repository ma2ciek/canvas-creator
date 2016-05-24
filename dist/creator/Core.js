var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './World', './shapes/Circle', './shapes/Rectangle', './shapes/Image', './shapes/Cell', './shapes/mask'], factory);
    }
})(function (require, exports) {
    "use strict";
    var World_1 = require('./World');
    var Circle_1 = require('./shapes/Circle');
    var Rectangle_1 = require('./shapes/Rectangle');
    var Image_1 = require('./shapes/Image');
    var Cell_1 = require('./shapes/Cell');
    var mask_1 = require('./shapes/mask');
    var World = (function (_super) {
        __extends(World, _super);
        function World() {
            _super.apply(this, arguments);
        }
        return World;
    }(World_1.default));
    exports.World = World;
    ;
    var Circle = (function (_super) {
        __extends(Circle, _super);
        function Circle() {
            _super.apply(this, arguments);
        }
        return Circle;
    }(Circle_1.default));
    exports.Circle = Circle;
    ;
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle() {
            _super.apply(this, arguments);
        }
        return Rectangle;
    }(Rectangle_1.default));
    exports.Rectangle = Rectangle;
    ;
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image() {
            _super.apply(this, arguments);
        }
        return Image;
    }(Image_1.default));
    exports.Image = Image;
    ;
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell() {
            _super.apply(this, arguments);
        }
        return Cell;
    }(Cell_1.default));
    exports.Cell = Cell;
    ;
    exports.circleMask = mask_1.circleMask;
});
