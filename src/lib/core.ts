import {
    IMergeBeforeConfig,
    IInterfaceHandler,
    IMergeAfterConfig,
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

        config = merge(this.globalConfig, config);

        let networkType = ['upload', 'download'].includes(config.method as string)
            ? (config.method as string)
            : 'xhr';
        let promise = Promise.resolve(config);
        const chain: any[] = [network[networkType as INetWorkType], null];

        this.interceptors.request.forEach((interceptor: IInterfaceHandler) => {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });

        this.interceptors.response.forEach((interceptor: IInterfaceHandler) => {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });

        console.log(chain);

        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }

        return promise;
    }

    // get(url: string, config: IMergeBeforeConfig = {}) {
    //     const newConfig = deepCopy(config, {
    //         url,
    //         method: 'get'
    //     });

    //     return this.request(newConfig);
    // }

    // post(url: string, config: IMergeBeforeConfig = {}) {
    //     const newConfig = deepCopy(config, {
    //         url,
    //         method: 'post'
    //     });

    //     return this.request(newConfig);
    // }

    abort(instance: any) {
        try {
            instance.example.abort();
        } catch (e) {}
    }
}

['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'upload', 'download'].forEach(
    (method) => {
        MyRequest.prototype[method] = function(url, config = {}) {
            const newConfig = deepCopy(config, {
                url,
                method
            });

            return this.request(newConfig);
        };
    }
);
