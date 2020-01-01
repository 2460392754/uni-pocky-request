import { IInterfaceHandler, IFulfilled, IRejected } from '../interface';

export class Interceptor {
    private handlers: (IInterfaceHandler | null)[] = [];

    /**
     * 添加 拦截器
     * @param {Function} fulfilled Promise.resolve里运行的函数
     * @param {Function} rejected  Promise.reject里运行的函数
     * @return {Number} 拦截器队列中注册的下标id
     */
    use(fulfilled: IFulfilled, rejected?: undefined | IRejected): number {
        this.handlers.push({
            fulfilled,
            rejected
        });

        return this.handlers.length - 1;
    }

    /**
     * 注销 拦截器
     * @param {Number} id 在拦截器队列中的下标id
     */
    eject(id: number): void {
        this.handlers[id] && (this.handlers[id] = null);
    }

    /**
     * 遍历所有的拦截器
     * @param {Function} fn
     */
    forEach(fn: Function): void {
        this.handlers.forEach((item) => {
            item && fn(item);
        });
    }
}
