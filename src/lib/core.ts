import {
    IMergeBeforeConfig,
    IMergeAfterConfig,
    IInterfaceHandler,
    INetWorkType
} from '../interface';
import { Interceptor } from './interceptor';
import { merge } from './merge';
import * as network from './network';
import { deepCopy } from '../utils';

export class MyRequest {
    private readonly globalConfig: IMergeBeforeConfig;

    interceptors = {
        request: new Interceptor(),
        response: new Interceptor()
    };

    constructor(globalConfig: IMergeBeforeConfig) {
        this.globalConfig = globalConfig;
    }

    request(config: IMergeBeforeConfig) {
        // 设置默认 config.method
        if (!config.method && !this.globalConfig.method) {
            config.method = 'get';
        }

        const newConfig = merge(this.globalConfig, config);

        let networkType = ['upload', 'download'].includes(newConfig.method as string)
            ? (newConfig.method as string)
            : 'xhr';
        let promise = Promise.resolve(newConfig);
        const chain: any[] = [network[networkType as INetWorkType], null];

        this.interceptors.request.forEach((interceptor: IInterfaceHandler) => {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });

        this.interceptors.response.forEach((interceptor: IInterfaceHandler) => {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });

        while (chain.length) {
            const resolved = chain.shift();
            const rejected = chain.shift();

            // promise = promise.then(chain.shift(), chain.shift());
            // promise = promise.then((res) => resolved(res, config), rejected);
            promise = promise.then(
                (res) => resolved(res, newConfig),
                (err) => rejected(err, newConfig)
            );
        }

        return promise;
    }

    abort(instance: any) {
        try {
            instance.example.abort();
        } catch (e) {}
    }
}

['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'upload', 'download'].forEach(
    (method) => {
        MyRequest.prototype[method] = function(url: string, config = {}) {
            const newConfig = deepCopy(config, {
                url,
                method
            });

            return this.request(newConfig);
        };
    }
);
