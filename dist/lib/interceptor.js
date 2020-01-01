export class Interceptor {
    constructor() {
        this.handlers = [];
    }
    use(fulfilled, rejected) {
        this.handlers.push({
            fulfilled,
            rejected
        });
        return this.handlers.length - 1;
    }
    eject(id) {
        this.handlers[id] && (this.handlers[id] = null);
    }
    forEach(fn) {
        this.handlers.forEach((item) => {
            item && fn(item);
        });
    }
}
