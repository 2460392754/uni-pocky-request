import { IAssginValueOptions, IObject } from '../interface';
import { isType } from './other';

// export const deepCopy = function(...args: IObject[]) {
//     let container: object = {};

//     args.forEach((arg) => {
//         for (const key in arg) {
//             container = assginValue({
//                 key,
//                 val: arg[key],
//                 container,
//                 callback: deepCopy
//             });
//         }
//     });

//     return container;
// };

// const assginValue = function(opts: IAssginValueOptions): object {
//     const { callback, container, key, val } = opts;
//     const cTypeIsObj: boolean = isType('Object', container[key]);
//     const vTypeIsObj: boolean = isType('Object', val);

//     if (cTypeIsObj && vTypeIsObj) {
//         container[key] = callback(container[key], val);
//     } else if (vTypeIsObj) {
//         container[key] = callback({}, val);
//     } else {
//         container[key] = val;
//     }

//     return container;
// };

// export const extend = function(target: any, obj: any, args?: any) {
//     for (const key in obj) {
//         const val = obj[key];

//         if (args && isType('Function', val)) {
//             target[key] = val.bind(args);
//         } else {
//             target[key] = val;
//         }
//     }

//     return target;
// };

export const deepCopy = function(...args: object[]): any {
    let res: object = {};

    args.forEach((arg) => {
        for (const key in arg) {
            res = assginValue(key, arg[key], res, deepCopy);
        }
    });

    return res;
};

const assginValue = function(
    key: string,
    val: object | any,
    container: object,
    callback: Function
): object {
    const cTypeIsObj: boolean = isType('Object', container[key]);
    const vTypeIsObj: boolean = isType('Object', val);

    if (cTypeIsObj && vTypeIsObj) {
        container[key] = callback(container[key], val);
    } else if (vTypeIsObj) {
        container[key] = callback({}, val);
    } else {
        container[key] = val;
    }

    return container;
};

export const extend = function(a: object, b: object, args?: any): any {
    for (const key in b) {
        const val: Function = b[key];

        if (args && isType('Function', val)) {
            a[key] = val.bind(args);
        } else {
            a[key] = val;
        }
    }

    return a;
};
