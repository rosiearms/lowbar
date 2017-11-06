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
    if (context) predicate = predicate.bind(context);
    var newList = [];
    _.each(list, function (item) {
        if (predicate(item)) {
            newList.push(item);
        }
    });
    return newList;
};

_.reject = function (list, predicate, context) {
    if (context) predicate = predicate.bind(context);
    var newList = [];
    _.each(list, function (item) {
        if (predicate(item) === false) {
            newList.push(item);
        }
    });
    return newList;
};

_.uniq = function (list, isSorted) {
    let newList = [];
    if (Array.isArray(list) || typeof list === 'string') {
        for (var i = 0; i < list.length; i++) {
            if (_.indexOf(newList, list[i], isSorted) === -1) newList.push(list[i]);
        }
        return newList;
    }
    return newList;
};

_.map = function (list, iteratee, context) {
    if (context) iteratee = iteratee.bind(context);
    let newList = [];
    _.each(list, function (item, i, list) {
        newList.push(iteratee(item, i, list));
    });
    return newList;
};

_.contains = function (list, val, fromIndex = 0) {
    if (Array.isArray(list) || typeof list === 'string') {
        if (_.indexOf(list, val, fromIndex) === -1) {
            return false;
        } else return true;
    }
    if (typeof list === 'object' && list != null) {
        for (var key in list) {
            if (list[key] === val) return true;
        }
    }
    return false;
};

_.pluck = function(list, propName) {
    return _.map(list, function(item, i, list) {
        if (list[i].hasOwnProperty(propName)) {
            return list[i][propName];
        }
    });
};

_.reduce = function(list, iteratee, memo) {
     _.each(list, function(item, i, list) { 
       if (!memo) {
           memo = item;
           iteratee(memo, item, i, list);
       }
       else memo = iteratee(memo, item, i, list);     
    });
    return memo;
};

module.exports = _;