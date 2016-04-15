export default class EventEmitter {
    private __handlers: IHandlers = {}

    on(eventName: string, fn: ICallback) {
        this.__handlers[eventName] ?
            this.__handlers[eventName].push(fn) :
            this.__handlers[eventName] = [fn];
    }

    emit(eventName: string, ...data: any[]) {
        if (this.__handlers[eventName])
            this.__handlers[eventName].forEach(e => e(...data));
    }
}