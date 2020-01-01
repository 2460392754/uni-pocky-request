import { myRequest } from './lib/core';
import { extend } from './utils/index';
import { IMergeBeforeConfig } from './interface';

const create = function(config: IMergeBeforeConfig) {
    const ctx = new myRequest(config);
    let instance = myRequest.prototype.request.bind(ctx);

    instance = extend(instance, myRequest.prototype, ctx);
    instance = extend(instance, ctx);

    return instance;
};

export default create;
