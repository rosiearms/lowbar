var path = require('path');
var expect = require('chai').expect;

var _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
    'use strict';

    it('is an object', function () {
        expect(_).to.be.an('object');
    });
});

describe('#identity', function () {
    it('is a function', function () {
        expect(_.identity).to.be.a('function');
    });
    it('returns the same value that is passed as an argument', function () {
        expect(_.identity('name')).to.equal('name');
        expect(_.identity({ name: 'stooge' })).to.eql({ name: 'stooge' });
        expect(_.identity([1, 2, 3])).to.eql([1, 2, 3]);
        expect(_.identity(null)).to.equal(null);
        expect(_.identity(NaN)).to.eql(NaN);
    });
});