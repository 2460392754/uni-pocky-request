export const xhr = function (config) {
    let instance;
    const promise = new Promise((resolve, reject) => {
        instance = uni.request({
            ...config,
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
    promise.__proto__.example = instance;
    return promise;
}
