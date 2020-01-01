import {
    IMergeBeforeConfig,
    IInterfaceHandler,
    IMergeAfterConfig,
    INetWorkType
} from '../interface';
import { Interceptor } from './interceptor';
import { merge } from './merge';
import * as network from './network';

export class myRequest {
    private readonly globalConfig: IMergeBeforeConfig;
    static interceptors = {
        request: new Interceptor(),
        response: new Interceptor()
    };

    constructor(globalConfig: IMergeBeforeConfig) {
        this.globalConfig = globalConfig;
    }

    request(config: IMergeBeforeConfig = {}) {
        // 设置默认 config.method
        if (!config.method && !this.globalConfig.method) {
            config.method = 'get';
        }

        config = merge(this.globalConfig, config);

        let networkType = ['upload', 'download'].includes(config.method as string)
            ? (config.method as string)
            : 'xhr';
        let promise = Promise.resolve(config);
        const chain: any[] = [network[networkType as INetWorkType]];

        myRequest.interceptors.request.forEach((interceptor: IInterfaceHandler) => {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });

        myRequest.interceptors.response.forEach((interceptor: IInterfaceHandler) => {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });

        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }

        return promise;
    }

    abort(instance: any) {
        try {
            instance.example.abort();
        } catch (e) {}
    }
}
