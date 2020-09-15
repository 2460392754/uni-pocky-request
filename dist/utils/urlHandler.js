const composeURL = function (baseURL, relativeURL) {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
};
const isAbsoluteURL = function (url) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};
export const getFullURL = function (baseURL, requestURL) {
    if (baseURL && !isAbsoluteURL(requestURL)) {
        return composeURL(baseURL, requestURL);
    }
    return requestURL;
};
export const paramsToURL = function (url, params) {
    let newParams = params;
    let newURL = url + (!~url.indexOf('?') ? '?' : '&');
    newParams = params;
    for (const [key, val] of Object.entries(newParams || {})) {
        newURL += `${key}=${val}&`;
    }
    return newURL.substring(0, newURL.length - 1);
};
