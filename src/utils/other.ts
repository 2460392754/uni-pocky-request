/**
 * 类型判断
 * @param {String} type 值的类型
 * @param {Any} val 需要判断的值
 * @return {Boolean}
 */
export const isType = function(type: string, val: any): boolean {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
};

// 停止promise的链式操作
export const breakPromise = function(): Promise<null> {
    return new Promise(() => null);
};

// 转换为 JSON 格式
export const toJSON = function(val: string): string {
    try {
        return JSON.parse(val);
    } catch (e) {
        return val;
    }
};
