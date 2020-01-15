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
export declare type IBeforeMethod =
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'head'
    | 'options'
    | 'download'
    | 'upload'
    | 'abort';
declare type IAfterMethod =
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT';
interface ICommonConfig extends IObject {
    data?: string | object | ArrayBuffer;
    params?: object;
    header?: any;
    dataType?: string;
    responseType?: string;
}
export interface IMergeBeforeConfig extends ICommonConfig {
    baseURL?: string;
    method?: IBeforeMethod;
    params?: IObject;
    header?: {
        [prop: string]: any;
        contentType?: string;
    };
}
export interface IMergeAfterConfig extends ICommonConfig {
    url?: string;
    method?: IAfterMethod;
    header?: any;
}
export declare type INetWorkType = 'xhr' | 'upload' | 'download';
export interface ICreateResult {
    interceptors: {
        request: IInterfaceHandler;
        response: IInterfaceHandler;
    };
    request(config: IMergeAfterConfig): Promise<any>;
    get(url: string, config?: IMergeAfterConfig): Promise<any>;
    post(url: string, config?: IMergeAfterConfig): Promise<any>;
    put(url: string, config?: IMergeAfterConfig): Promise<any>;
    delete(url: string, config?: IMergeAfterConfig): Promise<any>;
    connect(url: string, config?: IMergeAfterConfig): Promise<any>;
    head(url: string, config?: IMergeAfterConfig): Promise<any>;
    options(url: string, config?: IMergeAfterConfig): Promise<any>;
    trace(url: string, config?: IMergeAfterConfig): Promise<any>;
    download(url: string, config?: IMergeAfterConfig): Promise<any>;
    upload(url: string, config: IMergeAfterConfig): Promise<any>;
    abort(): void;
    onProgressUpdate?: Function;
    onHeadersReceived?: Function;
    offProgressUpdate?: Function;
    offHeadersReceived?: Function;
}
export {};
