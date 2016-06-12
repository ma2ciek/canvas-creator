/// <reference path="../../declarations/canvas.d.ts" />
/// <reference path="../../typings/index.d.ts" />
import * as Canvas from 'canvas';
import * as assert from 'assert';
import {Rectangle, World} from './Core';
import { makeStubs, makeMocks } from './unit-tests-utils';

makeStubs('requestAnimationFrame');
makeMocks('window');

describe('World', () => {
    let world: World;
    let canvas: Canvas;

    beforeEach(() => {
        canvas = new Canvas(500, 500);
        canvas.addEventListener = () => { };
        world = new World(canvas, {
            width: 500,
            height: 500,
        });
    });

    describe('#constructor()', () => {
        it('should conifgure canvas', () => {
            assert.equal(canvas.width, 500);
            assert.equal(canvas.height, 500);
        });
    });

    describe('#add()', () => {
        let rect: Rectangle;
        beforeEach(() => rect = new Rectangle({ x: 0, y: 0, width: 100, height: 100 }));

        it('should add single element', () => {
            world.add(rect);
            assert.equal(world.item(0), rect);
            assert.equal(world.getObjects().length, 1);
            // TODO
            // assert.equal(world.getCurrentDirtyRect(), {
            //     x: 0, y: 0, width: 100, height: 100
            // })
        });
    });
});
