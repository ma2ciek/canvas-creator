
import Circle from '../../src/creator/Circle';
import * as mocha from 'mocha';
import * as assert from 'assert';

describe('Circle', function() {
    
    var circle: Circle;
    
    beforeEach(function() {
        circle = new Circle({
            x: 30,
            y: 10,
            radius: 50,
            color: 'white',
            draggable: true
        });
    });
    
    it('#constructor()', function() {
        assert.equal(circle.x, 30);
    });
});
