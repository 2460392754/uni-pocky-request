import { MyRequest } from './lib/core';
import { IMergeBeforeConfig, ICreateResult } from './interface';
import { extend } from './utils/index';

const create = function(config: IMergeBeforeConfig): ICreateResult {
    const ctx = new MyRequest(config);
    let instance = MyRequest.prototype.request.bind(ctx);

    instance = extend(MyRequest.prototype, ctx);
    instance = extend(instance, ctx);

    return instance;
};

export default create;
