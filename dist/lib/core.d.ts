import { IMergeBeforeConfig } from '../interface';
import { Interceptor } from './interceptor';
export declare class MyRequest {
    private readonly globalConfig;
    interceptors: {
        request: Interceptor;
        response: Interceptor;
    };
    constructor(globalConfig: IMergeBeforeConfig);
    request(config: IMergeBeforeConfig): Promise<IMergeBeforeConfig>;
    abort(instance: any): void;
}
