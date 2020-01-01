import { IObject } from '../interface';
/**
 * 组合成绝对地址的 URL (基地址+相对地址)
 * @param {String} baseURL 基地址
 * @param {String} relativeURL 相对地址
 * @return {String}
 */
const composeURL = function(baseURL: string, relativeURL: string): string {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
};

/**
 * 判断是否是绝对地址 (有 `://`或 `//` 就算是绝对地址)
 * @param {String} url
 * @return {Boolean}
 */
const isAbsoluteURL = function(url: string): boolean {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * 获取完整的URL
 * @param {String|Undefined} baseURL 基地址
 * @param {String} requestURL 相对地址
 * @return {String}
 */
export const getFullURL = function(baseURL: string | undefined, requestURL: string): string {
    if (baseURL && !isAbsoluteURL(requestURL)) {
        return composeURL(baseURL, requestURL);
    }

    return requestURL;
};

/**
 * url添加params参数
 * @param {Object} o config
 * @param {String} o.url
 * @param {Object} o.params
 * @return {String}
 */
export const paramsToURL = function(url: string, params: IObject): string {
    let newParams: any = params;
    let newURL: string = url + (!~url.indexOf('?') ? '?' : '&');

    newParams = params;

    for (const [key, val] of (Object as any).entries(newParams || {})) {
        newURL += `${key}=${val}&`;
    }

    return newURL.substring(0, newURL.length - 1);
};
