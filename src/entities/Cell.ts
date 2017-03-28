import {Table} from "../elements/Table";
import {CellElement} from "../elements/CellElement";
import {ElementType} from "../elements/ElementType";
import {EditField} from "./EditField";
import {UUID} from "../utils/UUID";
import {WidgetBar} from "./WidgetBar";
import {ButtonBar} from "./ButtonBar";

// declare const $:JQueryStatic;

export class Cell {
    private static CLASSES: any = {
        hidden: "-js-rt-cellHidden"
    };

    private _buttonBar: ButtonBar;
    private _widgetBar: WidgetBar;
    private _content: string;
    private _readOnly: boolean;
    private _type: ElementType;
    private _editMode: boolean = false;
    private _element: JQuery;
    private _classes: Array<string>;
    private _cache: string;
    private _editField: EditField;
    private _table: Table;
    private _hidden: boolean = false;
    private _elementCache: JQuery;
    private _column: number;
    private _row: number;

    public constructor(content: string, readOnly: boolean = false, type: ElementType = ElementType.BODY, classes: Array<string> = [], table?: Table, widgetBar?: WidgetBar) {
        this.content = content;
        this.readOnly = readOnly;
        this.type = type;
        this.table = table;
        this.classes = classes;
        switch (type) {
            case ElementType.FOOTER:
            case ElementType.BODY:
                this.element = $('<td>').addClass(Table.CLASSES.cell);
                break;
            case ElementType.HEADER:
                this.element = $('<th>').addClass(Table.CLASSES.headerCell);
                break;
        }

        if (this.classes) {
            this.element.addClass(this.classes.join(' '));
        }
        this.element.text(content);
        this.element.attr("id", UUID.register(this.element));


        if (widgetBar) {
            this.widgetBar = widgetBar;
            this.element.mouseenter({cell: this}, $.proxy(widgetBar.enable, widgetBar));
            this.element.mouseleave({cell: this}, $.proxy(widgetBar.disable, widgetBar));
        }
    }

    public refreshEditField() {
        this.editField = new EditField(this);

        if (this.readOnly) {
            this.element.addClass(Table.CLASSES.readOnly);
        } else {
            this.element.click($.proxy(this.edit, this));
        }


    }

    public edit(event: BaseJQueryEventObject) {
        this.editField.edit(this, event);
    }

    static from(cellElement: CellElement, type?: "header"|"body"|"footer", table?: Table) {
        return new Cell(cellElement.content, cellElement.readOnly, type || cellElement.type, cellElement.classes, table, cellElement.widgetBar)
    }

    static fromArray(cellElements: Array<CellElement>, type?: "header"|"body"|"footer", table?: Table): Array<Cell> {
        const cells: Array<Cell> = [];

        if (!cellElements) return cells;

        cellElements.forEach(function (element) {
            cells.push(Cell.from(element, type, table));
        });

        return cells;
    }

    get buttonBar(): ButtonBar {
        return this._buttonBar;
    }

    set buttonBar(value: ButtonBar) {
        this._buttonBar = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get readOnly(): boolean {
        return this._readOnly;
    }

    set readOnly(value: boolean) {
        this._readOnly = value;
    }

    get type(): ElementType {
        return this._type;
    }

    set type(value: ElementType) {
        this._type = value;
    }

    get editMode(): boolean {
        return this._editMode;
    }

    set editMode(value: boolean) {
        this._editMode = value;
    }

    get element(): any {
        return this._element;
    }

    set element(value: any) {
        this._element = value;
    }

    get classes(): Array<string> {
        return this._classes;
    }

    set classes(value: Array<string>) {
        this._classes = value;
    }

    get cache(): string {
        return this._cache;
    }

    set cache(value: string) {
        this._cache = value;
    }

    get editField(): EditField {
        return this._editField;
    }

    set editField(value: EditField) {
        this._editField = value;
    }

    get table(): Table {
        return this._table;
    }

    set table(value: Table) {
        this._table = value;
    }

    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(value: boolean) {
        this._hidden = value;
    }

    get column(): number {
        return this._column;
    }

    get row(): number {
        return this._row;
    }

    set row(value: number) {
        this._row = value;
    }

    set elementCache(value: JQuery) {
        this._elementCache = value;
    }

    get elementCache() {
        return this._elementCache;
    }

    set column(value: number) {
        this._column = value;
    }

    get widgetBar(): WidgetBar {
        return this._widgetBar;
    }

    set widgetBar(value: WidgetBar) {
        this._widgetBar = value;
    }

    public static getPlaceholder(type: ElementType, classes: Array<string> = [], table?: Table, widgetBar?: WidgetBar): Cell {
        return new Cell("", true, type, classes, table, widgetBar)
    }

    public render() {
        if(this.buttonBar){
            this.element.empty().append(this.buttonBar.render());
        }

        return this.element;
    }
}