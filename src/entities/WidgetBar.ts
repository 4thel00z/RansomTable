import {Widget} from "./Widget";
import {Cell} from "../Cell";
import {WidgetElement} from "./WidgetElement";
export class WidgetBar {

    private _widgets: Array<Widget>;
    private _active: boolean = false;
    private cache: JQuery;

    constructor(widgets: Array<Widget>) {
        this.widgets = widgets;
    }

    public disable(event: JQueryEventObject) {
        const cell: Cell = event.data.cell;

        if (!event.data.cell) {
            return;
        }

        cell.element.empty().append(this.cache);
        this.cache = null;
    }

    public enable(event: JQueryEventObject) {
        const cell: Cell = event.data.cell;

        if (!event.data.cell) {
            return;
        }

        this.cache = cell.element.text();
        cell.element.empty().append(this.render());
    }

    public render(): JQuery {
        const widgetContainer: JQuery = $("<div>");
        this.widgets.forEach((widget: Widget, i: number) => {
            widgetContainer.append(widget.render())
        });
        return widgetContainer;
    }

    get widgets(): Array<Widget> {
        return this._widgets;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    set widgets(value: Array<Widget>) {
        this._widgets = value;
    }

    public static  from(array: Array<WidgetElement>) {
        const widgets: Array<Widget> = [];

        array.forEach((raw: WidgetElement) => {
            widgets.push(Widget.from(raw));
        });

        return new WidgetBar(widgets);
    }
}