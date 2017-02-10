import {Cell} from "./Cell";
import {CellElement, SimpleCellElement, ICellElement} from "./CellElement";
import {RowElement} from "./RowElement";
import {ElementType} from "./ElementType";
import {Table} from "./Table";
declare const $: any;

export class Row {

    protected element: any;
    protected type: ElementType;
    protected cells: Array<Cell>;
    protected table: Table;

    private constructor(cells: Array<Cell>, type: "header"|"body"|"footer" = ElementType.BODY, table?: Table) {
        this.cells = cells;
        this.type = type;
        this.element = $("<tr>").addClass(Table.classes.row);

        if (type === ElementType.FOOTER)
            this.element.addClass(Table.classes.footerRow);
        if (type === ElementType.HEADER)
            this.element.addClass(Table.classes.headerRow);
        this.table = table;
    }

    public static from(element: RowElement, table: Table): Row {
        return new Row(Cell.fromArray(element.cellElements, element.type, table), element.type);
    }

    public get(cellIndex: number): Cell|null {
        return cellIndex >= 0 && cellIndex < this.cells.length ? this.cells[cellIndex] : null;
    }

    public getSize() {
        return this.cells.length;
    }

    public static generateEmptyRows(n: number, cells: number, type: "header"|"body"|"footer", table?: Table) {
        const rowElement: RowElement = {
            type: ElementType.BODY,
            cellElements: SimpleCellElement.times(cells)
        };

        const rows: Array<Row> = [];
        for (let i = 0; i < n; i++) {
            rows.push(Row.from(rowElement, table));
        }
        return rows;
    }

    public static fromRaw(raw: {type: "header"|"body"|"footer", data: Array<ICellElement>}): Row {
        return new Row(Cell.fromArray(SimpleCellElement.fromArray(raw.data, raw.type)), raw.type);
    }

    public empty() {
        this.element.empty();
    }

    public render(node: any): any {
        let self: Row = this;
        this.cells.forEach(function (cell) {
            self.element.append(cell.element);
        });
        $(node).append(this.element);

        return node;
    }

}