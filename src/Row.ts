import {Cell} from "./Cell";
import {CellElement, SimpleCellElement} from "./CellElement";
import {RowElement} from "./RowElement";
import {ElementType} from "./ElementType";
import {Table} from "./Table";
declare const $: any;

export class Row {

    private element: any;
    private type: ElementType;
    protected cells: Array<Cell>;

    private constructor(cells: Array<Cell>, type: ElementType = ElementType.BODY) {
        this.cells = cells;
        this.type = type;
        this.element = $("<tr>");
    }

    public static from(element: RowElement): Row {
        const cells: Array<Cell> = [];
        element.cellElements.forEach(function (cellElement, index) {
            cells[index] = Cell.from(cellElement);
        });
        return new Row(cells, element.type);
    }

    public get(cellIndex: number): Cell|null {
        return cellIndex >= 0 && cellIndex < this.cells.length ? this.cells[cellIndex] : null;
    }

    public getSize() {
        return this.cells.length;
    }

    public static generateEmptyRows(n: number, cells: number, type: ElementType) {
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