import { IMergeBeforeConfig, IMergeAfterConfig, IObject } from '../interface';
import { isType, deepCopy, getFullURL, paramsToURL, adapterContentType } from '../utils/index';

const CONFIG_KEY_LIST = ['url', 'method', 'data', 'dataType', 'responseType', 'params'];
const CONFIG_MERGE_DEEP_KEY_LIST = ['header'];
const CONFIG_OPTIONAL_KEY_LIST = ['baseURL'];
const CONFIG_ALL_KEY_LIST = [
    ...CONFIG_KEY_LIST,
    ...CONFIG_MERGE_DEEP_KEY_LIST,
    ...CONFIG_OPTIONAL_KEY_LIST
];

export const merge = function(
    globalConfig: IMergeBeforeConfig | IMergeAfterConfig,
    instanceConfig: IMergeBeforeConfig = {}
): IMergeAfterConfig {
    // globalConfig + instanceConfig 所有字段去重后的key
    const ARGS_ALL_KEY_LIST = [
        ...new Set([...Object.keys(instanceConfig), ...Object.keys(globalConfig)])
    ];

    // ARGS_ALL_KEY_LIST 和 CONFIG_ALL_KEY_LIST 不重叠的key
    const REMAINDER_KEY_LIST = ARGS_ALL_KEY_LIST.filter(
        (key) => !CONFIG_ALL_KEY_LIST.includes(key)
    );

    const newConfig: any = {};

    // 必要参数
    CONFIG_KEY_LIST.forEach((prop) => {
        const val = instanceConfig[prop] || globalConfig[prop];

        !isType('Undefined', val) && (newConfig[prop] = val);
    });

    // 必要深拷贝参数
    CONFIG_MERGE_DEEP_KEY_LIST.forEach((prop) => {
        const globaltVal = globalConfig[prop];
        const instanceVal = instanceConfig[prop];

        if (isType('Object', instanceVal)) {
            newConfig[prop] = deepCopy(globaltVal, instanceVal);
        } else if (isType('Object', globaltVal)) {
            newConfig[prop] = deepCopy(globaltVal);
        }
    });

    // 配置文件中可选参数
    CONFIG_OPTIONAL_KEY_LIST.forEach((prop) => {
        const val = globalConfig[prop];

        if (!isType('Undefined', val)) {
            newConfig[prop] = globalConfig[prop];
        }
    });

    // 合并未出现在上述列表中的参数
    REMAINDER_KEY_LIST.forEach((prop) => {
        const defaultVal = globalConfig[prop];
        const instanceVal = instanceConfig[prop];

        if (!isType('Undefined', instanceVal)) {
            newConfig[prop] = instanceVal;
        } else if (!isType('Undefined', defaultVal)) {
            newConfig[prop] = defaultVal;
        }
    });

    const url = getFullURL(newConfig.baseURL, newConfig.url);
    newConfig.relativeURL = newConfig.url;
    newConfig.fullURL = paramsToURL(url, newConfig.params as IObject);
    newConfig.header = adapterContentType(
        globalConfig.header,
        instanceConfig.header,
        newConfig.header
    );

    // 删除 method为upload时，默认的 content-type
    if (newConfig.method === 'upload') {
        Reflect.deleteProperty(newConfig.header as object, 'content-type');
    }

    return newConfig;
};
