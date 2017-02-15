import {WidgetElement} from "../elements/WidgetElement";

// declare const $:JQueryStatic;

export class Widget {
    private _icon: string;
    private _onClick: (event: BaseJQueryEventObject) => boolean;
    private _element: JQuery;

    private static CLASSES = {
        icon: "-js-rt-widget-icon"
    };

    constructor(icon: string, onClick: (event: BaseJQueryEventObject) => boolean) {
        this.icon = icon;
        this.onClick = onClick;
    }

    public render() {
        if (!this.element) {
            this.element = $("<i>").addClass(["fa", "fa-" + this.icon, Widget.CLASSES.icon].join(" ")).click(this.onClick);
        }
        return this.element.click(this.onClick);
    }

    get icon(): string {
        return this._icon;
    }

    set icon(value: string) {
        this._icon = value;
    }

    get onClick(): (event: BaseJQueryEventObject) => boolean {
        return this._onClick;
    }

    set onClick(onClick: (event: BaseJQueryEventObject) => boolean) {
        this._onClick = onClick;
        if (this._element)
            this._element.click(onClick);
    }

    get element(): JQuery {
        return this._element;
    }

    set element(value: JQuery) {
        this._element = value;
    }

    public static from(raw: WidgetElement) {
        return new Widget(raw.icon, raw.onClick);
    }
}

