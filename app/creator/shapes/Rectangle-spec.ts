/// <reference path="../../../declarations/canvas.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
import * as Canvas from 'canvas';
import * as assert from 'assert';
import * as mocha from 'mocha';
import { Rectangle } from '../Core';
import { makeStubs, makeMocks } from '../unit-tests-utils';

const assertFalse = (x: boolean) => assert.ok(!x);

describe('Rectangle', () => {
    let rect: Rectangle;

    beforeEach(() => rect = new Rectangle({ x: 0, y: 50, width: 100, height: 200 }))

    it('contains', () => {
        assert.ok(rect.contains({ x: 0, y: 50 }));
        assert.ok(rect.contains({ x: 100, y: 250 }));
        assertFalse(rect.contains({ x: 100.5, y: 100 }));
    });

    it('containsRect', () => {
        assert.ok(rect.containsRect({ x: 0, y: 50, width: 100, height: 200 }));
        assertFalse(rect.containsRect({ x: 101, y: 251, width: 100, height: 200 }));
    });
});
