import "jquery";
declare const window: any;

export class EventManager {

    private static eventMap = {};

    public static makeGlobal() {
        if (window) {
            if (!window.ransomware) {
                window.ransomware = {};
            }
            if (!window.ransomware.EventManager) {
                window.ransomware.EventManager = EventManager;
            }
        }
    }

    public static removeGlobal() {
        if (window && window.ransomware) {
            return delete window.ransomware.EventManager;
        }
        return false;
    }

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

    public static registerOnKeypress(selector, key, handler, data?) {
        EventManager.addToEventMap(selector, "keypress", handler);
        $(selector).keypress(data, function (event) {
            if (event.which === key) {
                event.data = data;
                handler(event);
                return false;
            }
        });
    }

    public static unregisterOnKeypress(selector) {
        let eventType = "keypress";
        $(selector).removeAttr(eventType);
        EventManager.removeFromEventMap(selector, eventType);
    }


    public static onReturnKey(selector, handler, data) {
        EventManager.registerOnKeypress(selector, 13, handler, data);
    }

    public static offReturnKey(selector) {
        EventManager.unregisterOnKeypress(selector);
    }

}