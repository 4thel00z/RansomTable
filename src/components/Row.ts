import {Cell} from "./Cell";
import {RowElement} from "../elements/RowElement";
import {ElementType} from "../elements/ElementType";
import {Table} from "../elements/Table";

// declare const $:JQueryStatic;

export class Row {

    private _element: any;
    private _type: ElementType;
    private _cells: Array<Cell>;
    private _table: Table;
    private _index: number;
    private _visible: boolean;

    protected constructor(cells: Array<Cell>, type: "header"|"body"|"footer" = ElementType.BODY, table?: Table) {
        this.cells = cells;
        this.type = type;
        this.element = $("<tr>").addClass(Table.CLASSES.row);

        if (type === ElementType.FOOTER) {
            this.element.addClass(Table.CLASSES.footerRow);
        }

        if (type === ElementType.HEADER) {
            this.element.addClass(Table.CLASSES.headerRow);
        }

        this.table = table;
    }

    public static from(element: RowElement, table: Table): Row {
        return new Row(Cell.fromArray(element.cellElements, element.type, table), element.type, table);
    }

    public get(cellIndex: number): Cell|null {
        return cellIndex >= 0 && cellIndex < this._cells.length ? this._cells[cellIndex] : null;
    }

    public getSize() {
        return this._cells.length;
    }

    public empty() {
        this._element.empty();
    }

    public render(node: any): any {
        let self: Row = this;
        this._cells.forEach(function (cell: Cell, i) {
            cell.column = i;
            self._element.append(cell.render());
            cell.refreshEditField();
        });
        $(node).append(this._element);

        return node;
    }

    set index(i: number) {
        this._index = i;
    }

    set element(value: any) {
        this._element = value;
    }

    set table(value: Table) {
        this._table = value;
    }

    set type(value: ElementType) {
        this._type = value;
    }

    set cells(value: Array<Cell>) {
        this._cells = value;
    }

    get cells(): Array<Cell> {
        return this._cells;
    }

    get element(): any {
        return this._element;
    }

    get table(): Table {
        return this._table;
    }

    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
    }

    public prepend(cell: Cell) {
        this.cells.unshift(cell);
        return this.cells;
    }
}
