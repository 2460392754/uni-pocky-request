import { isType, deepCopy, getFullURL, paramsToURL, adapterContentType } from '../utils/index';
const CONFIG_KEY_LIST = ['url', 'method', 'data', 'dataType', 'responseType', 'params'];
const CONFIG_MERGE_DEEP_KEY_LIST = ['header'];
const CONFIG_OPTIONAL_KEY_LIST = ['baseURL'];
const CONFIG_ALL_KEY_LIST = [
    ...CONFIG_KEY_LIST,
    ...CONFIG_MERGE_DEEP_KEY_LIST,
    ...CONFIG_OPTIONAL_KEY_LIST
];
export const merge = function (globalConfig, instanceConfig = {}) {
    const ARGS_ALL_KEY_LIST = [
        ...new Set([...Object.keys(instanceConfig), ...Object.keys(globalConfig)])
    ];
    const REMAINDER_KEY_LIST = ARGS_ALL_KEY_LIST.filter((key) => !CONFIG_ALL_KEY_LIST.includes(key));
    const newConfig = {};
    CONFIG_KEY_LIST.forEach((prop) => {
        const val = instanceConfig[prop] || globalConfig[prop];
        !isType('Undefined', val) && (newConfig[prop] = val);
    });
    CONFIG_MERGE_DEEP_KEY_LIST.forEach((prop) => {
        const globaltVal = globalConfig[prop];
        const instanceVal = instanceConfig[prop];
        if (isType('Object', instanceVal)) {
            newConfig[prop] = deepCopy(globaltVal, instanceVal);
        }
        else if (isType('Object', globaltVal)) {
            newConfig[prop] = deepCopy(globaltVal);
        }
    });
    CONFIG_OPTIONAL_KEY_LIST.forEach((prop) => {
        const val = globalConfig[prop];
        if (!isType('Undefined', val)) {
            newConfig[prop] = globalConfig[prop];
        }
    });
    REMAINDER_KEY_LIST.forEach((prop) => {
        const defaultVal = globalConfig[prop];
        const instanceVal = instanceConfig[prop];
        if (!isType('Undefined', instanceVal)) {
            newConfig[prop] = instanceVal;
        }
        else if (!isType('Undefined', defaultVal)) {
            newConfig[prop] = defaultVal;
        }
    });
    const url = getFullURL(newConfig.baseURL, newConfig.url);
    newConfig.relativeURL = newConfig.url;
    newConfig.fullURL = paramsToURL(url, newConfig.params);
    newConfig.header = adapterContentType(globalConfig.header, instanceConfig.header, newConfig.header);
    if (newConfig.method === 'upload') {
        Reflect.deleteProperty(newConfig.header, 'content-type');
    }
    return newConfig;
};
