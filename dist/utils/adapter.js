import { deepCopy } from './deep';
import { isType } from './other';
export const adapterContentType = function (defaultHeader, instanceHeader, configHeader) {
    const LIST = [
        'content-type',
        'Content-type',
        'Content-Type',
        'contentType',
        'ContentType'
    ];
    const newConfigHeader = deepCopy(configHeader);
    let val;
    for (const KEY of Object.keys(defaultHeader)) {
        if (LIST.includes(KEY)) {
            val = defaultHeader[KEY];
            Reflect.deleteProperty(newConfigHeader, KEY);
            break;
        }
    }
    for (const KEY of Object.keys(instanceHeader)) {
        if (LIST.includes(KEY)) {
            val = instanceHeader[KEY];
            Reflect.deleteProperty(newConfigHeader, KEY);
            break;
        }
    }
    if (!isType('Undefined', val)) {
        newConfigHeader['content-type'] = val;
    }
    return newConfigHeader;
};
