export interface IAssginValueOptions {
    key: string;
    val: any;
    container: IObject;
    callback: Function;
}
export interface IObject {
    [prop: string]: any;
}
export interface IInterfaceHandler {
    fulfilled: IFulfilled;
    rejected: undefined | IRejected;
}
export declare type IFulfilled = (config: object, res: object) => false | object;
export declare type IRejected = (error: object) => false | object;
export declare type IBeforeMethod = 'get' | 'post' | 'put' | 'delete' | 'head' | 'options' | 'download' | 'upload' | 'abort';
declare type IAfterMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
interface ICommonConfig extends IObject {
    data?: string | object | ArrayBuffer;
    header?: any;
    dataType?: string;
    responseType?: string;
    onProgressUpdate?: Function;
    onHeadersReceived?: Function;
    offProgressUpdate?: Function;
    offHeadersReceived?: Function;
}
export interface IMergeBeforeConfig extends ICommonConfig {
    baseURL?: string;
    method?: IBeforeMethod;
    params?: IObject;
    header?: {
        contentType?: string;
    };
}
export interface IMergeAfterConfig extends ICommonConfig {
    url?: string;
    method?: IAfterMethod;
    header?: any;
}
export declare type INetWorkType = 'xhr' | 'upload' | 'download';
export {};
