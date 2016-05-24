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
        define(["require", "exports", './DirtyRect', './Draggability', './LayerManager', './utils/EventEmitter', './Cursor', './MapMove', './CanvasPosition'], factory);
    }
})(function (require, exports) {
    "use strict";
    var DirtyRect_1 = require('./DirtyRect');
    var Draggability_1 = require('./Draggability');
    var LayerManager_1 = require('./LayerManager');
    var EventEmitter_1 = require('./utils/EventEmitter');
    var Cursor_1 = require('./Cursor');
    var MapMove_1 = require('./MapMove');
    var CanvasPosition_1 = require('./CanvasPosition');
    var World = (function (_super) {
        __extends(World, _super);
        function World(canvas, config) {
            if (config === void 0) { config = {}; }
            _super.call(this);
            this.canvas = canvas;
            this.config = config;
            this.ctx = canvas.getContext('2d');
            this.initializeModules(canvas, config);
            this.draw();
        }
        World.prototype.initializeModules = function (canvas, config) {
            var _this = this;
            var finder = this.getObject.bind(this);
            this.dirtyRect = new DirtyRect_1.default();
            this.layerManager = new LayerManager_1.default();
            this.cursor = new Cursor_1.default(canvas, finder);
            this.draggability = new Draggability_1.default(canvas, finder);
            this.draggability.on('dirt', function (rect) { return _this.dirtyRect.add(rect); });
            if (config.mapMove) {
                this.mapMove = new MapMove_1.default(canvas, finder);
                this.mapMove.onMoveEmitter.subscribe(function (change) {
                    _this.canvasPosition.moveBy(change);
                });
            }
            this.canvasPosition = new CanvasPosition_1.default(canvas, config);
            this.canvasPosition.positionEmitter.subscribe(function (newPosition) {
                _this.dirtyRect.updatePosition(newPosition);
                _this.renderAll();
            });
            this.canvasPosition.dimensionEmitter.subscribe(function (width, height) {
                return _this.dirtyRect.updateDimensions(width, height);
            });
        };
        World.prototype.add = function (object, position) {
            var _this = this;
            this.layerManager.add(object, position);
            object.on('dirt', function () { return _this.dirtyRect.add(object.getBoundingRect()); });
            this.dirtyRect.add(object.getBoundingRect());
            this.propagateObjectEvents(object);
        };
        World.prototype.propagateObjectEvents = function (object) {
            var _this = this;
            var eventNames = ['click', 'mouseDown', 'mouseUp', 'mouseMove'];
            eventNames.forEach(function (eventName) {
                return object.on(eventName, function () {
                    _this.emit(eventName, object);
                    _this.emit(object.type + ':' + eventName, object);
                });
            });
        };
        World.prototype.renderAll = function () {
            this.dirtyRect.dirtAll();
        };
        World.prototype.draw = function () {
            var _this = this;
            var rect = this.dirtyRect.get();
            var pos = this.canvasPosition.get();
            this.ctx.save();
            this.ctx.translate(-pos.x, -pos.y);
            this.ctx.beginPath();
            this.ctx.rect(rect.x, rect.y, rect.width, rect.height);
            this.ctx.clip();
            this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
            this.layerManager
                .each(function (i) { return i.containsRect(rect) && i.draw(_this.ctx); });
            this.ctx.restore();
            this.dirtyRect.clear();
            window.requestAnimationFrame(function () { return _this.draw(); });
        };
        World.prototype.getObject = function (p) {
            var result = null;
            var transformed = this.canvasPosition.canvasToWorld(p);
            this.layerManager.each(function (object) {
                if (object.contains(transformed)) {
                    result = object;
                    return;
                }
            });
            return result;
        };
        World.prototype.item = function (x) {
            return this.layerManager.get(x);
        };
        return World;
    }(EventEmitter_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = World;
});
