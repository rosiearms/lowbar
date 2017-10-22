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

module.exports = _;