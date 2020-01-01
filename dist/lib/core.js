import { Interceptor } from './interceptor';
import { merge } from './merge';
import * as network from './network';
export class myRequest {
    constructor(globalConfig) {
        this.globalConfig = globalConfig;
    }
    request(config = {}) {
        if (!config.method && !this.globalConfig.method) {
            config.method = 'get';
        }
        config = merge(this.globalConfig, config);
        let networkType = ['upload', 'download'].includes(config.method)
            ? config.method
            : 'xhr';
        let promise = Promise.resolve(config);
        const chain = [network[networkType]];
        myRequest.interceptors.request.forEach((interceptor) => {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        myRequest.interceptors.response.forEach((interceptor) => {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });
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
myRequest.interceptors = {
    request: new Interceptor(),
    response: new Interceptor()
};
