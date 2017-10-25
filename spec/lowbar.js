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

describe('#first', function () {
    it('is a function', function () {
        expect(_.first).to.be.a('function');
    });
    it('returns undefined if anything other than an array or string is passed as an argument', function () {
        expect(_.first({ name: 'foo' })).to.equal(undefined);
        expect(_.first(10)).to.equal(undefined);
        expect(_.first(NaN)).to.equal(undefined);
        expect(_.first(null)).to.equal(undefined);
        expect(_.first(0)).to.equal(undefined);
    });
    it('returns the first letter of a string if no number is passed as a second arguement', function () {
        expect(_.first('string')).to.equal('s');
    });
    it('returns the first n elements of a string in an array when n is passed as a second arguement', function () {
        expect(_.first('string', 3)).to.eql(['s', 't', 'r']);
    });
    it('returns the first element of an array if no number is given as a second argument', function () {
        expect(_.first([1, 2, 3])).to.equal(1);
    });
    it('returns n elements from an array when passed n as a second argument', function () {
        expect(_.first([1, 2, 3], 2)).to.eql([1, 2]);
    });
});

describe('#last', function () {
    it('is a function', function () {
        expect(_.last).to.be.a('function');
    });
    it('returns undefined if anything other than an array or string is passed as an argument', function () {
        expect(_.last({ name: 'foo' })).to.equal(undefined);
        expect(_.last(10)).to.equal(undefined);
        expect(_.last(NaN)).to.equal(undefined);
        expect(_.last(null)).to.equal(undefined);
        expect(_.last(0)).to.equal(undefined);
    });
    it('returns the last letter of a string if no number is passed as a second arguement', function () {
        expect(_.last('string')).to.equal('g');
    });
    it('returns last n elements of a string in an array when n is passed as a second arguement', function () {
        expect(_.last('string', 3)).to.eql(['i', 'n', 'g']);
    });
    it('returns the last element of an array if no number is given as a second argument', function () {
        expect(_.last([1, 2, 3])).to.equal(3);
    });
    it('returns n elements from an array when passed n as a second argument', function () {
        expect(_.last([1, 2, 3], 2)).to.eql([2, 3]);
    });
});

describe('#each', function () {
    it('is a function', function () {
        expect(_.each).to.be.a('function');
    });
    it('calls the iteratee as many times as items in the passed array', function () {
        var count = 0;
        function incrCount() {
            count++;
        }
        _.each([1, 2, 3], incrCount);
        expect(count).to.equal(3);
    });
    it('calls the iteratee passing each element of the array as the first argument', function () {
        var bucket = [];
        function putIn() {
            bucket.push(arguments[0]);
        }
        _.each([1, 2, 3], putIn);
        expect(bucket).to.eql([1, 2, 3]);
    });
    it('iterates over objects and iterates as many times as items in the passed object', function () {
        var bucket = [];
        function putIn() {
            bucket.push(arguments[0]);
        }
        _.each({ one: '1', two: '2', three: '3' }, putIn);
        expect(bucket).to.eql(['1', '2', '3']);
    });
});

describe('#indexOf', function () {
    it('is a function', function () {
        expect(_.indexOf).to.be.a('function');
    });
    it('returns -1 if the value is not found in the passed array', function () {
        expect(_.indexOf([1, 2, 3], 2)).to.equal(1);
        expect(_.indexOf([1, 5, 3, 60, 10, 1], 60)).to.equal(3);
        expect(_.indexOf([1, 5, 3, 12, 6, 0], 6)).to.equal(4);
    });
    it('returns the index position of the passed value in the array', function () {
        expect(_.indexOf([1, 2, 3], 2)).to.equal(1);
        expect(_.indexOf([1, 5, 3, 60, 10, 1], 60)).to.equal(3);
        expect(_.indexOf([1, 5, 3, 12, 6, 0], 6)).to.equal(4);
    });
});