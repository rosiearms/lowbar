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
            bucket.push(this.name);
        }
        _.each([1, 2], putIn, context);
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
    it('searches for the index position of the passed value from the specified number if passed as a third arg', function () {
        expect(_.indexOf([7, 8, 9, 10, 11, 12, 13, 14, 15], 11, 2)).to.equal(4);
        expect(_.indexOf([4, 2, 9, 7, 1, 5, 6, 3, 8], 7, 5)).to.equal(-1);
        expect(_.indexOf('string', 'n', 2)).to.equal(4);
        expect(_.indexOf('string', 'g', 3)).to.equal(5);
    });
    it('conducts a binary search on an array if isSorted is passed as true', function () {
        expect(_.indexOf([7, 8, 9, 10, 11, 12, 13, 14, 15], 11, true)).to.equal(4);
        expect(_.indexOf([4, 5, 9, 7, 1, 2, 6, 3, 8], 7, true)).to.equal(-1);
    });
});

describe('#filter', function () {
    it('is a function', function () {
        expect(_.filter).to.be.a('function');
    });
    it('looks through each value in the list, returning an array of all the values that return true', function () {
        expect(_.filter([1, 2, 3, 4, 5, 6], function (num) {
            return num % 2 === 0;
        })).to.eql([2, 4, 6]);
        expect(_.filter('string', function (letter) {
            return letter === 'n';
        })).to.eql(['n']);
        expect(_.filter({n:'n', s:'s'}, function (letter) {
            return letter === 'n';
        })).to.eql(['n']);
    });
    it('returns an empty array if an invalid format is given or no item returns true', function () {
        expect(_.filter([7,7,7,7,7], function (num) {
            return num % 2 === 0;
        })).to.eql([]);
        expect(_.filter(null, function (letter) {
            return letter === 'n';
        })).to.eql([]);
        expect(_.filter(0, function (letter) {
            return letter === 'n';
        })).to.eql([]);
    });
    it('binds the list to the context object if one is passed', function () {
        let context = {name: 'string'};
        let res = [];
        function putIn() {
            res.push(this.name);
        }
        _.filter([7,7], putIn, context);
    expect(res).to.eql(['string', 'string']);
    });
});

describe('#reject', function () {
    it('is a function', function () {
        expect(_.reject).to.be.a('function');
    });
    it('looks through each value in the list, returning an array of all the values that return false', function () {
        expect(_.reject([1, 2, 3, 4, 5, 6], function (num) {
            return num % 2 === 0;
        })).to.eql([1,3,5]);
        expect(_.reject('string', function (letter) {
            return letter === 'n';
        })).to.eql(['s','t','r','i','g']);
        expect(_.reject({n:'n', s:'s'}, function (letter) {
            return letter === 'n';
        })).to.eql(['s']);
    });
    it('returns an empty array if an invalid format is given or no item returns false', function () {
        expect(_.reject([6,6,6,6], function (num) {
            return num % 2 === 0;
        })).to.eql([]);
        expect(_.reject(null, function (letter) {
            return letter === 'n';
        })).to.eql([]);
        expect(_.reject(0, function (letter) {
            return letter === 'n';
        })).to.eql([]);
    });
    it('binds the list to the context object if one is passed', function () {
        let context = {name: 'string'};
        let res = [];
        function putIn() {
            res.push(this.name);
        }
        _.reject([7,7], putIn, context);
    expect(res).to.eql(['string', 'string']);
    });
});

describe('#uniq', function () {
    it('is a function', function () {
        expect(_.uniq).to.be.a('function');
    });
    it('returns an empty array if list is passed in an invalid format', function () {
        expect(_.uniq({one:'1', two:'2'}, false)).to.eql([]);
        expect(_.uniq(null, true)).to.eql([]);
        expect(_.uniq(true, false)).to.eql([]);
        expect(_.uniq(12345, false)).to.eql([]);
    });
    it('returns a new array of unique items from a passed array or string', function () {
        expect(_.uniq([1,3,4,1,2,2,4,3,5])).to.eql([1,3,4,2,5]);
        expect(_.uniq('sttriinng')).to.eql(['s','t','r','i','n','g']);
    });
    it('uses isSorted to conduct a faster search when passed true as a second argument', function () {
        expect(_.uniq([1,1,1,2,2,3,3,4,4,4])).to.eql([1,2,3,4]);
        expect(_.uniq('sssstttrrriiinnnggg')).to.eql(['s','t','r','i','n','g']);
    });
});

describe('#map', function () {
    it('is a function', function () {
        expect(_.map).to.be.a('function');
    });
    it('returns an empty array if list is an invalid format', function () {
        expect(_.map(null, function(num) {return num + 1;})).to.eql([]);
        expect(_.map(1234, function(num) {return num + 1;})).to.eql([]);
        expect(_.map(0, function(num) {return num + 1;})).to.eql([]);
    });
    it('returns an array of items that have been passed through an iteratee function, works for arrays, strings and objects', function () {
        expect(_.map([1,2,3], function(num) {return num + 1;})).to.eql([2,3,4]);
        expect(_.map('string', function(letter) {return letter + 1;})).to.eql(['s1', 't1', 'r1', 'i1', 'n1', 'g1']);
        expect(_.map({one:'1', two:'2'}, function(item) {return item + 1;})).to.eql(['11', '21']);
    });
    it('takes an iteratee function that tracks the index or key of the list as it iterates', function () {
        expect(_.map([1,2,3], function(num, i) {return num + i;})).to.eql([1,3,5]);
        expect(_.map('str', function(letter, i) {return letter + i;})).to.eql(['s0', 't1', 'r2']);
        expect(_.map({one:'1', two:'2'}, function(item, key) {return item + key;})).to.eql(['1one', '2two']);
    });
    it('binds the iteratee to the context object if one is passed', function () {
        let context = {one:'1', two: '2', three:'3'};
        let res = [];
        _.map(['i', 'i', 'i'], function(num) { return res.push(num + this.one);}, context);
    expect(res).to.eql(['i1','i1','i1']);
    });
});

describe('#contains', function () {
    it('is a function', function () {
        expect(_.contains).to.be.a('function');
    });
    it('returns true if the passed value is found in the passed array and false if not', function () {
        expect(_.contains([1,2,3], 3)).to.equal(true);
        expect(_.contains([1,2,3], 6)).to.equal(false);
        expect(_.contains('string', 'n')).to.equal(true);
        expect(_.contains('string', 'f')).to.equal(false);
        expect(_.contains({one:'one', two: 'two'}, 'two')).to.equal(true);
        expect(_.contains({one:'one', two: 'two'}, 'three')).to.equal(false);
    });
    it('searches from a given index when passed a fromIndex argument', function () {
        expect(_.contains([1,2,3,4,5,6], 2, 3)).to.equal(false);
        expect(_.contains('string', 't', 3)).to.equal(false);
    });
});

describe('#pluck', function () {
    it('is a function', function () {
        expect(_.pluck).to.be.a('function');
    });
    it('returns undefined or an empty array if list is an invalid format', function () {
        expect(_.pluck(['moe', 'larry', 'curly'], 'curly')).to.eql([undefined, undefined, undefined]);
        expect(_.pluck('moe', 'm')).to.eql([undefined, undefined, undefined]);
        expect(_.pluck(null, null)).to.eql([]);
        expect(_.pluck(false, false)).to.eql([]);
    });
    it('returns an array of property values from the property name passed', function () {
        expect(_.pluck([{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}], 'name')).to.eql(['moe', 'larry', 'curly']);
    });
});

describe.only('#reduce', function () {
    it('is a function', function () {
        expect(_.reduce).to.be.a('function');
    });
    it('reduces the list to a single value', function () {
        expect(_.reduce([1,2,3], function(memo, num) {return num + memo;}, 0)).to.equal(6);
        expect(_.reduce('string', function(memo, letter) { if (letter === 't') memo.push(letter); return memo;}, [])).to.eql(['t']);
        expect(_.reduce({one:'1', two:'2', three:'3'}, function(memo, item) { memo.push(item); return memo;}, [])).to.eql(['1', '2', '3']);
    });
});
