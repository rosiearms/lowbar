var _ = {};

_.identity = function (arg) {
    return arg;
};

_.first = function (arr, n = 1) {
    if (!Array.isArray(arr) && !arr === 'string' || arr === null || arr === undefined) return undefined;
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
    if (!Array.isArray(arr) && !arr === 'string' || arr === null || arr === undefined) return undefined;
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

_.each = function (list, iteratee = _.identity, context) {
    if (context) iteratee = iteratee.bind(context);
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
    if (!predicate) return _.identity(list);
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
    if (!predicate) return _.identity(list);
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
    if (!iteratee) return _.identity(list);
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

_.pluck = function (list, propName) {
    return _.map(list, function (item, i, list) {
        if (list[i].hasOwnProperty(propName)) {
            return list[i][propName];
        }
    });
};

_.reduce = function (list, iteratee, memo, context) {
    if (context) iteratee = iteratee.bind(context);
    if (!iteratee) return _.identity(list);
    _.each(list, function (item, i, list) {
        if (!memo) {
            memo = item;
            iteratee(memo, item, i, list);
        }
        else memo = iteratee(memo, item, i, list);
    });
    return memo;
};

_.every = function (list, predicate = _.identity, context) {
    if (context) predicate = predicate.bind(context);
    if (Array.isArray(list) || typeof list === 'string') {
        for (var i = 0; i < list.length; i++) {
            if (predicate(list[i]) === false) return false;
        }
    } else if (typeof list === 'object' || list !== null) {
        for (var key in list) {
            if (predicate(list[key]) === false) return false;
        }
    }
    return true;
};

_.some = function (list, predicate, context) {
    if (context) predicate = predicate.bind(context);
    if (Array.isArray(list) || typeof list === 'string') {
        for (let i = 0; i < list.length; i++) {
            if (predicate(list[i]) === true) return true;
        }
    } else if (typeof list === 'object' || list !== null) {
        for (let key in list) {
            if (predicate(list[key]) === true) return true;
        }
    }
    return false;
};

_.extend = function (destination) {
    if (typeof destination === 'object' && destination !== null) {
        let sources = [].slice.call(arguments, 1);
        return Object.assign(destination, ...sources);
    }
    return destination;
};

_.defaults = function (object) {
    for (let i = 1; i < arguments.length; i++) {
        for (let key in arguments[i]) {
            if (!object[key]) {
                object[key] = arguments[i][key];
            }
        }
    }
    return object;
};

_.once = function (func) {
    let flag = true;
    return () => {
        if (flag) {
            flag = false;
            return func();
        }
    };
};

_.shuffle = function (list) {

    let origList;
    let newList = [];

    if (Array.isArray(list)) origList = list.slice();
    if (typeof list === 'string') origList = list.split('');
    if (typeof list === 'object' && list !== null) origList = Object.values(list);

    while (origList.length > 0) {
        let index = Math.floor(Math.random() * origList.length);
        newList.push(origList[index]);
        origList.splice(index, 1);
    }
    return newList;
};

_.invoke = function (list, methodName) {
    if (typeof list !== 'object') return [];
    const args = [].slice.call(arguments, 2);
    return _.map(list, function (item) {
        return item[methodName].apply(item, args);
    });
};

_.sortBy = function (list, iteratee = _.identity, context) {
    if (context) iteratee.bind(context);
    if (typeof list !== 'object' && typeof list !== 'string') return [];
    let newList = list;
    if (typeof iteratee === 'string') {
        newList = list.slice();
        return newList.sort(function (a, b) {
            if (a[iteratee] < b[iteratee]) return -1;
            if (a[iteratee] > b[iteratee]) return 1;
            return 0;
        });
    }
    if (Array.isArray(list)) newList = list.slice();
    if (typeof list === 'string') newList = list.split('');
    if (typeof list === 'object' && list !== null) newList = Object.values(list);
    return newList.sort((a, b) => iteratee(b) < iteratee(a));
};

_.zip = function () {
    let mergedArr = [];
    let args = [].slice.apply(arguments);
    _.map(args, (arr) => {
        _.map(arr, (item, i) => {
            if (mergedArr[i]) mergedArr[i].push(item);
            else mergedArr[i] = [item];
        });
    });
    return mergedArr;
};

_.sortedIndex = function (list, value, iteratee, context) {
    if (context) iteratee = iteratee.bind(context);

    if (!Array.isArray(list) && typeof list !== 'string') return 0;

    let newList = list.slice();
    newList.push(value);
    
    if (iteratee) {
        newList = _.sortBy(newList, iteratee);
    } else newList.sort();

    return _.indexOf(newList, value);
};

_.flatten = function (arr, shallow) {
   if (!Array.isArray(arr)) return []; 
   return _.reduce(arr, (acc, item) => {
    if (shallow) return acc.concat(item);
    else if (Array.isArray(item)) { 
        return _.flatten(acc.concat(item));
    } else return acc.concat(item);
   }, []);
};

_.intersection = function () {

    let args = [].slice.apply(arguments);

    return _.reduce(args[0], (acc, item) => {
      if (_.every(args, (arr) => _.contains(arr, item))
        && !_.contains(acc, item)) acc.push(item);
      return acc;
    }, []);
  };

_.difference = function (array) {

    let others = [].slice.call(arguments, 1);
    
        return _.reduce(array, (acc, item) => {
          if (_.every(others, (arr) => !_.contains(arr, item))
            && !_.contains(acc, item)) acc.push(item);
          return acc;
        }, []);

};

module.exports = _;