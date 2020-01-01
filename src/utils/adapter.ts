import { deepCopy } from './deep';
import { isType } from './other';

/**
 * `content-type` 适配器
 * @param {Object} defaultHeader [{}]
 * @param {Object} instanceHeader [{}]
 * @param {Object} configHeader
 * @return {Object}
 */
export const adapterContentType = function(
    defaultHeader: {} | any,
    instanceHeader: {} | any,
    configHeader: any
) {
    const LIST: string[] = [
        'content-type',
        'Content-type',
        'Content-Type',
        'contentType',
        'ContentType'
    ];

    const newConfigHeader = deepCopy(configHeader);
    let val: string | undefined;

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
        (newConfigHeader as any)['content-type'] = val;
    }

    return newConfigHeader;
};
