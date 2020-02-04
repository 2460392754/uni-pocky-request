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
    rejected: null | IRejected;
}

export interface IInterceptor {
    use(fulfilled: IFulfilled, rejected?: null | IRejected): number;
    eject(id: number): void;
    forEach(fn: Function): void;
}

export type IFulfilled = (config: IMergeAfterConfig, res?: object) => false | object;

export type IRejected = (error: object) => false | object;

export type IBeforeMethod =
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'head'
    | 'options'
    | 'download'
    | 'upload'
    | 'abort';

type IAfterMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

interface ICommonConfig extends IObject {
    data?: string | object | ArrayBuffer;
    header?: any;
    dataType?: string;
    responseType?: string;
}

export interface IMergeBeforeConfig extends ICommonConfig {
    baseURL?: string;
    method?: IBeforeMethod;
    params?: any;
    data?: any;
    header?: {
        [prop: string]: any;
        contentType?: string;
    };
}

export interface IMergeAfterConfig extends ICommonConfig {
    baseURL: string;
    relativeURL: string;
    fullURL: string;
    method: IAfterMethod;
    header?: any;
    params?: any;
    data?: any;
}

export type INetWorkType = 'xhr' | 'upload' | 'download';

export interface ICreateResult {
    interceptors: {
        request: IInterceptor;
        response: IInterceptor;
    };
    request(config: IMergeBeforeConfig): Promise<any>;
    get(url: string, config?: IMergeBeforeConfig): Promise<any>;
    post(url: string, config?: IMergeBeforeConfig): Promise<any>;
    put(url: string, config?: IMergeBeforeConfig): Promise<any>;
    delete(url: string, config?: IMergeBeforeConfig): Promise<any>;
    connect(url: string, config?: IMergeBeforeConfig): Promise<any>;
    head(url: string, config?: IMergeBeforeConfig): Promise<any>;
    options(url: string, config?: IMergeBeforeConfig): Promise<any>;
    trace(url: string, config?: IMergeBeforeConfig): Promise<any>;
    download(url: string, config?: IMergeBeforeConfig): Promise<any>;
    upload(url: string, config: IMergeBeforeConfig): Promise<any>;
    abort(): void;
    onProgressUpdate?: Function;
    onHeadersReceived?: Function;
    offProgressUpdate?: Function;
    offHeadersReceived?: Function;
}
