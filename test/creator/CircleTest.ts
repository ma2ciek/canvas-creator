/// <reference path="../../typings/main.d.ts" />
import assert = require('assert');
import mocha = require('mocha');
import Circle from '../../app/creator/shapes/Circle';

describe('Circle', function () {
    var circle: Circle;

    beforeEach(function () {
        circle = new Circle({
            x: 30,
            y: 10,
            radius: 50,
            color: 'white',
            draggable: true
        });
    });

    it('#constructor()', function () {
        assert.equal(circle.x, 30);
    });
});

