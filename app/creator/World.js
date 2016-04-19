var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './DirtRect', './Draggability', './Point', './logger', './descriptors'], factory);
    }
})(function (require, exports) {
    "use strict";
    var DirtRect_1 = require('./DirtRect');
    var Draggability_1 = require('./Draggability');
    var Point_1 = require('./Point');
    var logger_1 = require('./logger');
    var descriptors_1 = require('./descriptors');
    var World = (function () {
        function World(canvas, config) {
            var _this = this;
            this.canvas = canvas;
            this.objects = [];
            this.worldPosition = new Point_1.Point(0, 0);
            this.dirtRect = new DirtRect_1.default();
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.ctx = canvas.getContext('2d');
            var draggability = new Draggability_1.default(canvas, this.getObject.bind(this));
            draggability.on('dirt', function (rect) { return _this.dirtRect.add(rect); });
            draggability.on('maybeBringForward', function (object) {
                config.ontop && _this.bringObjectForward(object);
            });
            draggability.on('worldMove', function (p) { return _this.moveWorld(p); });
            this.draw();
        }
        World.prototype.moveWorld = function (p) {
            this.worldPosition.add(p);
            this.dirtRect.add({
                x: 0, y: 0,
                width: this.canvas.width,
                height: this.canvas.height
            });
        };
        World.prototype.add = function (object) {
            this.objects.push(object);
            this.dirtRect.add(object.getBoundingRect());
        };
        World.prototype.renderAll = function () {
            var c = this.canvas;
            this.dirtRect.add({ x: 0, y: 0, width: c.width, height: c.height });
        };
        // todo: not working?
        World.prototype.bringObjectForward = function (object) {
            var index = this.objects.indexOf(object);
            this.objects.splice(index, 1);
            this.objects.push(object);
        };
        World.prototype.draw = function () {
            var _this = this;
            logger_1.default.frameStart('rendering');
            var rect = this.dirtRect.get();
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.rect(rect.x, rect.y, rect.width, rect.height);
            this.ctx.clip();
            this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
            this.objects.forEach(function (i) {
                return i.containsRect(_this.dirtRect.get()) && i.draw(_this.ctx);
            });
            this.ctx.restore();
            this.dirtRect.clear();
            requestAnimationFrame(function () { return _this.draw(); });
            logger_1.default.frameEnd('rendering');
        };
        World.prototype.getObject = function (p) {
            for (var i = this.objects.length - 1; i >= 0; i--) {
                var object = this.objects[i];
                if (object.draggable && object.contains(p)) {
                    return object;
                }
            }
            return null;
        };
        __decorate([
            descriptors_1.log
        ], World.prototype, "moveWorld", null);
        return World;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = World;
});
