import { MyRequest } from './lib/core';
import { extend } from './utils/index';
export const createInstance = function (config) {
    let instance = new MyRequest(config);
    return instance;
};
export const createSingleInstance = function (config) {
    const ctx = new MyRequest(config);
    let instance = MyRequest.prototype.request.bind(ctx);
    instance = extend(MyRequest.prototype, ctx);
    instance = extend(instance, ctx);
    return instance;
};
export default createInstance;
