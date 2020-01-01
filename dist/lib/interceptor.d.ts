import { IFulfilled, IRejected } from '../interface';
export declare class Interceptor {
    private handlers;
    use(fulfilled: IFulfilled, rejected?: undefined | IRejected): number;
    eject(id: number): void;
    forEach(fn: Function): void;
}
