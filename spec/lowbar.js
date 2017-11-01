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

describe.only('#each', function () {
    it('is a function', function () {
        expect(_.each).to.be.a('function');
    });
    it('calls the iteratee as many times as items in the passed array', function () {
        let count = 0;
        function incrCount() {
            count++;
        }
        _.each([1, 2, 3], incrCount);
        expect(count).to.equal(3);
    });
    it('calls the iteratee as many times as items in the passed string', function () {
        let count = 0;
        function incrCount() {
            count++;
        }
        _.each('lowbar', incrCount);
        expect(count).to.equal(6);
    });
    it('calls the iteratee passing each element of the array as the first argument', function () {
        let bucket = [];
        function putIn() {
            bucket.push(arguments[0]);
        }
        _.each([1, 2, 3], putIn);
        expect(bucket).to.eql([1, 2, 3]);
    });
    it('iterates over objects and iterates as many times as items in the passed object', function () {
        let count = 0;
        function incrCount() {
            count++;
        }
        _.each({ one: '1', two: '2', three: '3' }, incrCount);
        expect(count).to.eql(3);
    });
    it('returns the list if passed in an invalid format', function () {
        function incrCount() {
            console.log('lowbar');
        }
        expect(_.each(123, incrCount)).to.eql(123);
        expect(_.each(null, incrCount)).to.eql(null);
        expect(_.each(0, incrCount)).to.eql(0);
    });
    it('should bind the iteratee to the context object if one is passed', function () {
        const context = {name: 'lowbar'};
        var bucket = [];
        function putIn() {
            bucket.push(context.name);
        }
        _.each([1, 2], putIn);
        expect(bucket).to.eql(['lowbar', 'lowbar']);
    });
});

describe('#indexOf', function () {
    it('is a function', function () {
        expect(_.indexOf).to.be.a('function');
    });
    it('returns -1 if the value is not found in the passed array or string', function () {
        expect(_.indexOf([1, 2, 3], 5)).to.equal(-1);
        expect(_.indexOf('string', 'h')).to.equal(-1);
    });
    it('returns the index position of the passed value in the array or string', function () {
        expect(_.indexOf([1, 2, 3], 2)).to.equal(1);
        expect(_.indexOf([1, 5, 3, 60, 10, 1], 60)).to.equal(3);
        expect(_.indexOf('string', 'n')).to.equal(4);
        expect(_.indexOf('string', 't')).to.equal(1);
    });
});

describe('#filter', function () {
    it('is a function', function () {
        expect(_.filter).to.be.a('function');
    });
    it('looks through each value in the array, returning an array of all the values that pass the truth test', function () {
        expect(_.filter([1, 2, 3, 4, 5, 6], function (num) {
            return num % 2 === 0;
        })).to.eql([2, 4, 6]);
    });
});