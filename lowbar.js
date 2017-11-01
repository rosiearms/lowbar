var _ = {};

_.identity = function (arg) {
    return arg;
};

_.first = function (arr, n = 1) {
    if (!Array.isArray(arr) && !arr === 'string' || arr === null) return undefined;
    if (n === 1) {
        return arr[0];
    } else {
        if (typeof arr === 'string') {
            return arr.slice(0, n).split('');
        } else {
            return arr.slice(0, n);
        }
    }
};

_.last = function (arr, n = 1) {
    if (!Array.isArray(arr) && !arr === 'string' || arr === null) return undefined;
    if (n === 1) {
        return arr[arr.length - 1];
    } else {
        if (typeof arr === 'string') {
            return arr.slice(-n).split('');
        } else {
            return arr.slice(-n);
        }
    }
};

_.each = function (list, iteratee, context) {
    if (context) iteratee = iteratee.bind(context);
    if (!iteratee) return list;
    if (Array.isArray(list) || typeof list === 'string') {
        for (var i = 0; i < list.length; i++) {
            iteratee(list[i], i, list);
        }
    } else {
        for (var key in list) {
            iteratee(list[key], key, list);
        }
    }
    return list;
};

_.indexOf = function (arr, val, isSorted) {
    let res = -1;
    if (Array.isArray(arr) && isSorted === undefined || typeof arr === 'string' && isSorted === undefined) {
    _.each(arr, function (item, i) {
        if (item === val && res === -1) {
            res = i;
        }
    });
    return res;
} 

if (Array.isArray(arr) && typeof isSorted === 'number' || typeof arr === 'string' && typeof isSorted === 'number') {
    let res = 0;
    for (var i = isSorted; i < arr.length; i++) {
        if (arr[i] === val) res = i;
    } 
    return res;
}
};

_.filter = function (arr, iteratee) {
    var newArr = [];
    _.each(arr, function (item) {
        if (iteratee(item)) {
            newArr.push(item);
        }
    });
    return newArr;
};

module.exports = _;