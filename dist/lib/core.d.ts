import { IMergeBeforeConfig } from '../interface';
import { Interceptor } from './interceptor';
export declare class myRequest {
    private readonly globalConfig;
    static interceptors: {
        request: Interceptor;
        response: Interceptor;
    };
    constructor(globalConfig: IMergeBeforeConfig);
    request(config?: IMergeBeforeConfig): Promise<IMergeBeforeConfig>;
    abort(instance: any): void;
}
