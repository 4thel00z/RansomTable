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

    private constructor(cells: Array<Cell>, type: "header"|"body"|"footer" = ElementType.BODY) {
        this.cells = cells;
        this.type = type;
        this.element = $("<tr>");
    }

    public static from(element: RowElement): Row {
        const cells: Array<Cell> = [];
        if (element.cellElements) {
            element.cellElements.forEach(function (cellElement, index) {
                cells[index] = Cell.from(cellElement);
            });
        }
        return new Row(cells, element.type);
    }

    public get(cellIndex: number): Cell|null {
        return cellIndex >= 0 && cellIndex < this.cells.length ? this.cells[cellIndex] : null;
    }

    public getSize() {
        return this.cells.length;
    }

    public static generateEmptyRows(n: number, cells: number, type: "header"|"body"|"footer") {
        const rowElement: RowElement = {
            type: ElementType.BODY,
            cellElements: SimpleCellElement.times(cells)
        };

        const rows: Array<Row> = [];
        for (let i = 0; i < n; i++) {
            rows.push(Row.from(rowElement));
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