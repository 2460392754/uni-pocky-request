export const isType = function (type, val) {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
};
export const breakPromise = function () {
    return new Promise(() => null);
};
export const toJSON = function (val) {
    try {
        return JSON.parse(val);
    }
    catch (e) {
        return val;
    }
};
