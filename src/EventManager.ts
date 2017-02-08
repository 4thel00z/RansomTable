declare const $: any;

export class EventManager {

    private static eventMap = {};

    private static addToEventMap(selector, eventType, handler) {
        if (!EventManager.eventMap[eventType]) {
            EventManager.eventMap[eventType] = {};
        }
        EventManager.eventMap[eventType][selector] = handler;

        return handler;
    }

    private static removeFromEventMap(selector, eventType) {
        if (!EventManager.eventMap[eventType]) {
            EventManager.eventMap[eventType] = {};
            return false;
        }

        let wasFound = !!EventManager.eventMap[eventType][selector];
        EventManager.eventMap[eventType][selector] = undefined;
        delete EventManager.eventMap[eventType][selector];

        return wasFound;
    }

    public static registerOnKeypress(selector, key, handler) {
        $(selector).keypress(function (event) {
            if (event.which === key) {
                event.preventDefault();
                return handler(event);
            }
        });
    }

    public static unregisterOnKeypress(selector) {
        let eventType = "keypress";
        $(selector).removeAttr(eventType);
        EventManager.removeFromEventMap(selector, eventType);
    }


    public static onReturnKey(selector, handler) {
        EventManager.registerOnKeypress(selector, 14, handler);
    }

    public static offReturnKey(selector) {
        EventManager.unregisterOnKeypress(selector);
    }

}