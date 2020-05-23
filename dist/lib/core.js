import { Interceptor } from './interceptor';
import { merge } from './merge';
import * as network from './network';
import { deepCopy } from '../utils';
export class MyRequest {
    constructor(globalConfig) {
        this.interceptors = {
            request: new Interceptor(),
            response: new Interceptor()
        };
        this.globalConfig = globalConfig;
    }
    request(config) {
        if (!config.method && !this.globalConfig.method) {
            config.method = 'get';
        }
        const newConfig = merge(this.globalConfig, config);
        let networkType = ['upload', 'download'].includes(newConfig.method)
            ? newConfig.method
            : 'xhr';
        let promise = Promise.resolve(newConfig);
        const chain = [network[networkType], null];
        this.interceptors.request.forEach((interceptor) => {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        this.interceptors.response.forEach((interceptor) => {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });
        while (chain.length) {
            while (chain.length) {
                const resolved = chain.shift();
                const rejected = chain.shift();
                promise = promise.then((res) => resolved(res, config), rejected);
            }
        }
        return promise;
    }
    abort(instance) {
        try {
            instance.example.abort();
        }
        catch (e) { }
    }
}
['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'upload', 'download'].forEach((method) => {
    MyRequest.prototype[method] = function (url, config = {}) {
        const newConfig = deepCopy(config, {
            url,
            method
        });
        return this.request(newConfig);
    };
});
