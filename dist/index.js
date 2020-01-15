import { MyRequest } from './lib/core';
import { extend } from './utils/index';
const create = function (config) {
    const ctx = new MyRequest(config);
    let instance = MyRequest.prototype.request.bind(ctx);
    instance = extend(MyRequest.prototype, ctx);
    instance = extend(instance, ctx);
    return instance;
};
export default create;
