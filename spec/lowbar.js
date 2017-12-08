var path = require('path');
var expect = require('chai').expect;
let sinon = require('sinon');

var _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
    'use strict';

    it('is an object', function () {
        expect(_).to.be.an('object');
    });
});

describe('#identity', function () {
    it('returns the same value that is passed as an argument', function () {
        expect(_.identity('name')).to.equal('name');
        expect(_.identity({ name: 'stooge' })).to.eql({ name: 'stooge' });
        expect(_.identity([1, 2, 3])).to.eql([1, 2, 3]);
        expect(_.identity(null)).to.equal(null);
        expect(_.identity(NaN)).to.eql(NaN);
    });
});

describe('#first', function () {
    it('returns undefined if anything other than an array or string is passed as an argument', function () {
        expect(_.first({ name: 'foo' })).to.equal(undefined);
        expect(_.first(10)).to.equal(undefined);
        expect(_.first(NaN)).to.equal(undefined);
        expect(_.first(null)).to.equal(undefined);
        expect(_.first(0)).to.equal(undefined);
        expect(_.first()).to.equal(undefined);
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
    it('returns undefined if anything other than an array or string is passed as an argument', function () {
        expect(_.last({ name: 'foo' })).to.equal(undefined);
        expect(_.last(10)).to.equal(undefined);
        expect(_.last(NaN)).to.equal(undefined);
        expect(_.last(null)).to.equal(undefined);
        expect(_.last(0)).to.equal(undefined);
        expect(_.last()).to.equal(undefined);
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
    it('returns the list if no iteratee is passed', function () {
        expect(_.each([1, 2, 3])).to.eql([1, 2, 3]);
        expect(_.each({ one: '1', two: '2', three: '3' })).to.eql({ one: '1', two: '2', three: '3' });
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
    it('returns the list if no predicate is passed', function () {
        expect(_.filter([1, 2, 3])).to.eql([1, 2, 3]);
        expect(_.filter({ one: '1', two: '2', three: '3' })).to.eql({ one: '1', two: '2', three: '3' });
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
    it('returns the list if no predicate is passed', function () {
        expect(_.reject([1, 2, 3])).to.eql([1, 2, 3]);
        expect(_.reject({ one: '1', two: '2', three: '3' })).to.eql({ one: '1', two: '2', three: '3' });
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
    it('returns the list if no iteratee is passed', function () {
        expect(_.map([1, 2, 3])).to.eql([1, 2, 3]);
        expect(_.map({ one: '1', two: '2', three: '3' })).to.eql({ one: '1', two: '2', three: '3' });
    });
    it('binds the iteratee to the context object if one is passed', function () {
        let context = {one:'1', two: '2', three:'3'};
        let res = [];
        _.map(['i', 'i', 'i'], function(num) { return res.push(num + this.one);}, context);
    expect(res).to.eql(['i1','i1','i1']);
    });
});

describe('#contains', function () {
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

describe('#reduce', function () {
    it('reduces the list to a single value', function () {
        expect(_.reduce([1,2,3], function(memo, num) {return num + memo;}, 0)).to.equal(6);
        expect(_.reduce('string', function(memo, letter) { if (letter === 't') memo.push(letter); return memo;}, [])).to.eql(['t']);
        expect(_.reduce({one:'1', two:'2', three:'3'}, function(memo, item) { memo.push(item); return memo;}, [])).to.eql(['1', '2', '3']);
    });
    it('returns the memo if passed a list in an invalid format', function () {
        expect(_.reduce(12345, function(memo, num) {return num + memo;}, 0)).to.equal(0);
        expect(_.reduce(null, function(memo, letter) { if (letter === 't') memo.push(letter); return memo;}, [])).to.eql([]);
        expect(_.reduce(true, function(memo, item) { memo.push(item); return memo;}, [])).to.eql([]);
    });
    it('returns the list if no iteratee is passed', function () {
        expect(_.reduce([1, 2, 3])).to.eql([1, 2, 3]);
        expect(_.reduce({ one: '1', two: '2', three: '3' })).to.eql({ one: '1', two: '2', three: '3' });
    });
    it('binds the iteratee to the context object if passed one', function () {
        let context = {one:'1', two:'2'};
        expect(_.reduce([1,2], function(memo) {memo.push(this.one); return memo;}, [], context)).to.eql(['1', '1']);
    });
});

describe('#every', function () {
    it('returns true if passed a list in an invalid format', function () {
        expect(_.every(12345, function(num) {return num % 2 === 0;})).to.equal(true);
        expect(_.every(null, function(num) {return num % 2 === 0;})).to.equal(true);
        expect(_.every(false, function(letter) {return letter !== 'z';})).to.equal(true);
    });
    it('returns true if all items in the array, string or object pass the predicate test', function () {
        expect(_.every([2,2,4,6,6], function(num) {return num % 2 === 0;})).to.equal(true);
        expect(_.every({two:'2', four:'4'}, function(num) {return num % 2 === 0;})).to.equal(true);
        expect(_.every('string', function(letter) {return letter !== 'z';})).to.equal(true);
    });
    it('returns false if at least one item in the array, string or object does not pass the predicate test', function () {
        expect(_.every([2,2,4,6,7], function(num) {return num % 2 === 0;})).to.equal(false);
        expect(_.every({two:'2', four:'4', five:'5'}, function(num) {return num % 2 === 0;})).to.equal(false);
        expect(_.every('string', function(letter) {return letter === 'n';})).to.equal(false);
    });
    it('returns true if no predicate is passed', function () {
        expect(_.every([1, 2, 3])).to.eql(true);
        expect(_.every({ one: '1', two: '2', three: '3' })).to.eql(true);
    });
    it('should bind the predicate function to the context object if one is passed', function () {
        let context = {two:'2', four:'4', five:'5'};
        let res = [];
        _.every([2,2,4], function() { res.push(this.four);}, context);
        expect(res).to.eql(['4','4','4']);
    });
});

describe('#some', function () {
    it('returns false if passed a list in an invalid format', function () {
        expect(_.some(12345, function(num) {return num % 2 === 0;})).to.equal(false);
        expect(_.some(null, function(num) {return num % 2 === 0;})).to.equal(false);
        expect(_.some(false, function(letter) {return letter !== 'z';})).to.equal(false);
    });
    it('returns true if at least one item in the array, object or string passes the predicate test', function () {
        expect(_.some([7,7,4,6,6], function(num) {return num % 2 === 0;})).to.equal(true);
        expect(_.some({one:'1', two:'2', three:'3', four:'4'}, function(num) {return num % 2 === 0;})).to.equal(true);
        expect(_.some('string', function(letter) {return letter === 'n';})).to.equal(true);
    });
    it('returns false if no items in the array, object or string pass the predicate test', function () {
        expect(_.some([7,7,7,7,7], function(num) {return num % 2 === 0;})).to.equal(false);
        expect(_.some({one:'1', three:'3'}, function(num) {return num % 2 === 0;})).to.equal(false);
        expect(_.some('string', function(letter) {return letter === 'z';})).to.equal(false);
    });
    it('should bind the predicate function to the context object if one is passed', function () {
        let context = {two:'2', four:'4', five:'5'};
        let res = [];
        _.some([2,2,4], function() { res.push(this.four);}, context);
        expect(res).to.eql(['4','4','4']);
    });
});

describe('#extend', function () {
    it('returns the destination if passed an invalid data type', function () {
        expect(_.extend(123456, {two:'2', four:'4'})).to.eql(123456);
        expect(_.extend('string', {two:'2', four:{three: '3', one: '1'}})).to.eql('string');
        expect(_.extend(null, {two:'2', four:{three: '3', one: '1'}})).to.eql(null);
    });
    it('returns the destination object with all the items in the source object copied over to it', function () {
        expect(_.extend({one:'1', three:'3'}, {two:'2', four:'4'})).to.eql({one:'1', three:'3', two:'2', four:'4'});
        expect(_.extend({one:'1', three:'3'}, {two:'2', four:{three: '3', one: '1'}})).to.eql({one:'1', three:'3', two:'2', four:{three: '3', one: '1'}});
    });
    it('replaces properties of the same name in the source object with the properties in the destination object', function () {
        expect(_.extend({one:'1', two:'2', three:'3'}, {one:'one', three:'three'})).to.eql({one:'one', two:'2', three:'three'});
    });
});

describe('#defaults', function () {
    it('returns an object with an undefined properties filled in with the first value in the following default objects', function () {
        const iceCream = {flavor: 'chocolate'};
        expect(_.defaults(iceCream, {flavor: 'vanilla', sprinkles: 'lots'})).to.eql({flavor: 'chocolate', sprinkles: 'lots'});
    });
    it('returns an array with any unfilled index positions filled in with the items in the corresponding positions from the default array', function () {
        expect(_.defaults(['Rosie', 'James'], ['Amy', 'Lisa', 'Serena', 'Stephen'])).to.eql(['Rosie', 'James', 'Serena', 'Stephen']);
    });    it('returns the passed object when given in an invalid data type ', function () {
        expect(_.defaults(1234, { num: 1234 })).to.equal(1234);
        expect(_.defaults('string', 'string')).to.equal('string');
        expect(_.defaults(true, { false: false })).to.equal(true);
        expect(_.defaults(null, null)).to.equal(null);
    });
});

describe('#once', function () {
    it('only calls the passed function once', function () {
       const spy = sinon.spy(console.log);
       const oneCall = _.once(spy);
       oneCall('123'), ('123'), oneCall('123');
       expect(spy.callCount).to.equal(1);
    });
});

describe('#shuffle', function () {
    it('returns a shuffled version of the original array each time it is called', function () {
        const arr = [1,2,3,4,5,6,7,8,9,10];
        let first = _.shuffle(arr);
        let second = _.shuffle(arr);
       expect(first).to.not.eql(second);
    });
    it('returns the same amount of elements in the new array', function () {
        expect(_.shuffle([1,2,3,4,5,6,7,8,9,10]).length).to.equal(10);
     });
     it('does not alter the original array', function () {
        const arr = [1,2,3,4,5,6,7,8,9,10];
       expect( _.shuffle(arr)).to.not.equal(arr);
    });
     it('returns an array with the same amount of elements as characters in the passed string', function () {
        expect(_.shuffle('string').length).to.equal(6);
     });
     it('shuffles the string elements each time it is called', function () {
         let first = _.shuffle('string');
         let second = _.shuffle('string');
        expect(first).to.not.equal(second);
     });
     it('returns an array of shuffled values from a passed object', function () {
        let first = _.shuffle({ one: '1', two: '2', three: '3' });
        let second = _.shuffle({ one: '1', two: '2', three: '3' });
       expect(first).to.not.equal(second);
    });
});

describe('#invoke', function () {
    it('it returns an empty array if passed an invalid list', () => {
        expect(_.invoke(1,2,3)).to.eql([]);
        expect(_.invoke([])).to.eql([]);
        expect(_.invoke({})).to.eql([]);
        expect(_.invoke('hello')).to.eql([]);
    });
    it('calls passed method on each element in the list', function () {
        let list = [[5, 1, 7], [3, 2, 1]];
       expect(_.invoke(list, 'sort')).to.eql([[1, 5, 7], [1, 2, 3]]);
    }); 
});

describe('#sortBy', function () {
    it('returns an empty array if passed an invalid list', () => {
        expect(_.sortBy()).to.eql([]);
        expect(_.sortBy(true)).to.eql([]);
        expect(_.sortBy(123)).to.eql([]);
    });
    it('it returns an array of elements sorted alphabetically when given a string', () => {
        expect(_.sortBy('acdbef')).to.eql(['a', 'b', 'c','d', 'e', 'f']);
    });
    it('it returns an array of sorted elements from a passed array or an object', () => {
        expect(_.sortBy([1,4,3,2])).to.eql([1,2,3,4]);
        expect(_.sortBy(['a', 'd', 'c', 'b'])).to.eql(['a', 'b', 'c', 'd']);
        expect(_.sortBy({four:'4', three:'3', two:'2', one:'1'})).to.eql(['1', '2', '3', '4']);
    });
    it('it returns an array of sorted elements based on an iteratee if one is passed', () => {
        expect(_.sortBy([1,2,3,4,5,6], num => Math.sin(num))).to.eql([5, 4, 6, 3, 1, 2]);
        expect(_.sortBy(['1', '123', '12', '1234'],str => str.length)).to.eql(['1', '12', '123', '1234']);
    });
});

describe('#zip', function () {
    it('it returns an empty array when passed an invalid data type', () => {
        expect(_.zip()).to.eql([]);
        expect(_.zip(null)).to.eql([]);
        expect(_.zip(123)).to.eql([]);
        expect(_.zip({})).to.eql([]);
    });
    it('returns a new list of arrays with merged items', () => {
        expect(_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])).to.eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]);
    });
});

describe.only('#sortedIndex', function () {
    it('it returns 0 when passed an invalid data type', () => {
        expect(_.sortedIndex()).to.eql(0);
        expect(_.sortedIndex(null)).to.eql(0);
        expect(_.sortedIndex(123)).to.eql(0);
        expect(_.sortedIndex({})).to.eql(0);
    });
    it('returns the index position of where an element should be placed in a sorted array', () => {
        expect(_.sortedIndex([10, 30, 40, 60], 35)).to.eql(2);
    });
    it('returns the index position of where an element should be placed in a sorted array in relation to the iteratee', () => {
        expect(_.sortedIndex(['1', '12', '123', '12345'], '1234', 'length')).to.eql(3);
    });
    it('returns the index position of where an element should be placed in relation to object values', () => {
        var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
        expect( _.sortedIndex(stooges, {name: 'larry', age: 50}, 'age')).to.eql(1);
    });
});
