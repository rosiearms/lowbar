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
    if ((Array.isArray(arr) || typeof arr === 'string') && isSorted === undefined) {
        _.each(arr, function (item, i) {
            if (item === val && res === -1) {
                res = i;
            }
        });
    } if ((Array.isArray(arr) || typeof arr === 'string') && typeof isSorted === 'number') {
        let res = -1;
        for (var i = isSorted; i < arr.length; i++) {
            if (arr[i] === val) res = i;
        }
        return res;
    } if (Array.isArray(arr) && isSorted === true) {
        let beg = 0;
        let end = arr.length - 1;
        let mid;
        while (end >= beg) {
            mid = Math.floor((beg + end) / 2);
            if (arr[mid] === val) {
                return mid;
            }
            else if (arr[mid] < val) {
                beg = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
    } return res;
};

_.filter = function (list, predicate, context) {
    if(context) predicate = predicate.bind(this);
    var newList = [];
    _.each(list, function (item) {
        if (predicate(item)) {
            newList.push(item);
        }
    });
    return newList;
};

module.exports = _;