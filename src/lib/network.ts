import { toJSON } from '../utils/index';
import { IMergeAfterConfig } from '../interface';
import { merge } from './merge';

export const xhr = function(config: IMergeAfterConfig) {
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

export const upload = function(config: IMergeAfterConfig) {
    let instance;

    const promise = new Promise((resolve, reject) => {
        instance = uni.uploadFile({
            ...config,
            url: config.fullURL,
            // success: (res) => {
            //     res.data = toJSON(res.data);

            //     resolve(res);
            // },
            success: resolve,
            fail: reject
        });

        bindEvent(config, instance);
    });

    return promiseInstanceBindData(promise, instance);
};

export const download = function(config: IMergeAfterConfig) {
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

// request 实例上绑定回调函数
function bindEvent(config: IMergeAfterConfig, instance: any) {
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

// 使用 `Object.setProrotypeOf` 会修改自己的隐性原型，把 `Promise` 重新指向成 `Object`
function promiseInstanceBindData(promise: any, instance: any) {
    promise.__proto__.example = instance;

    return promise;
}
