import { isType } from './other';
export const deepCopy = function (...args) {
    let res = {};
    args.forEach((arg) => {
        for (const key in arg) {
            res = assginValue(key, arg[key], res, deepCopy);
        }
    });
    return res;
};
const assginValue = function (key, val, container, callback) {
    const cTypeIsObj = isType('Object', container[key]);
    const vTypeIsObj = isType('Object', val);
    if (cTypeIsObj && vTypeIsObj) {
        container[key] = callback(container[key], val);
    }
    else if (vTypeIsObj) {
        container[key] = callback({}, val);
    }
    else {
        container[key] = val;
    }
    return container;
};
export const extend = function (a, b, args) {
    for (const key in b) {
        const val = b[key];
        if (args && isType('Function', val)) {
            a[key] = val.bind(args);
        }
        else {
            a[key] = val;
        }
    }
    return a;
};
