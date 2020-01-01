import { myRequest } from './lib/core';
import { extend } from './utils/index';
const create = function (config) {
    const ctx = new myRequest(config);
    let instance = myRequest.prototype.request.bind(ctx);
    instance = extend(instance, myRequest.prototype, ctx);
    instance = extend(instance, ctx);
    return instance;
};
export default create;
