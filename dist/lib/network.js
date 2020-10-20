import { merge } from './merge';
export const xhr = function (config) {
    let instance;
    const promise = new Promise((resolve, reject) => {
        config = merge(config);
        instance = uni.request({
            url: config.fullURL,
            method: config.method,
            header: config.header,
            data: config.data,
            success: resolve,
            fail: reject
        });
    });
    return promiseInstanceBindData(promise, instance);
};
export const upload = function (config) {
    let instance;
    const promise = new Promise((resolve, reject) => {
        instance = uni.uploadFile({
            ...config,
            url: config.fullURL,
            success: resolve,
            fail: reject
        });
        bindEvent(config, instance);
    });
    return promiseInstanceBindData(promise, instance);
};
export const download = function (config) {
    let instance;
    const promise = new Promise((resolve, reject) => {
        instance = uni.downloadFile({
            ...config,
            url: config.fullURL,
            success: resolve,
            fail: reject
        });
        bindEvent(config, instance);
    });
    return promiseInstanceBindData(promise, instance);
};
function bindEvent(config, instance) {
    const event = [
        'onProgressUpdate',
        'onHeadersReceived',
        'offProgressUpdate',
        'offHeadersReceived'
    ];
    event.forEach((e) => {
        let callback = config[e];
        typeof callback === 'function' && instance[e](callback);
    });
}
function promiseInstanceBindData(promise, instance) {
    return promise;
}
