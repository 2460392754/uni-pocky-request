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
        config = merge(this.globalConfig, config);
        let networkType = ['upload', 'download'].includes(config.method)
            ? config.method
            : 'xhr';
        let promise = Promise.resolve(config);
        const chain = [network[networkType], null];
        this.interceptors.request.forEach((interceptor) => {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        this.interceptors.response.forEach((interceptor) => {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });
        console.log(chain);
        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
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
