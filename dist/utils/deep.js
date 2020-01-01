import { isType } from './other';
export const deepCopy = function (...args) {
    let container = {};
    args.forEach((arg) => {
        for (const key in arg) {
            container = assginValue({
                key,
                val: arg[key],
                container,
                callback: deepCopy
            });
        }
    });
    return container;
};
const assginValue = function (opts) {
    const { callback, container, key, val } = opts;
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
export const extend = function (target, obj, args) {
    for (const key in obj) {
        const val = obj[key];
        if (args && isType('Function', val)) {
            target[key] = val.bind(args);
        }
        else {
            target[key] = val;
        }
    }
    return target;
};
