import { MyRequest } from './lib/core';
import { IMergeBeforeConfig, ICreateResult } from './interface';
import { extend } from './utils/index';

// 创建 myRequest 实例对象
export const createInstance = function(config: IMergeBeforeConfig): ICreateResult {
    let instance = new MyRequest(config);

    return instance as any;
};

// 创建 myRequest 单例对象
export const createSingleInstance = function(config: IMergeBeforeConfig) {
    const ctx = new MyRequest(config);
    let instance = MyRequest.prototype.request.bind(ctx);

    instance = extend(MyRequest.prototype, ctx);
    instance = extend(instance, ctx);

    return instance;
};

export default createInstance;
