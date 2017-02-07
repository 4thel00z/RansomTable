import {Cell} from "./Cell";
declare const $: any;

export class Row {

    private type: "header"|"footer"|"default";
    protected cells: Array<Cell>;


    constructor(cells: Array<Cell>, type: "header"|"footer"|"default" = "default") {
        this.cells = cells;
        this.type = type;
    }

    public get(n: number) {
        if (n >= 0 && n < this.cells.length) {
            return this.cells[n];
        }
    }

    public getSize() {
        return this.cells.length;
    }

    public static generateEmptyRows(n: number, cells: number, type: "header"|"footer"|"default") {
        const rows: Array<Row> = [];

        for (let i = 0; i < n; i++) {
            rows.push(new Row(Cell.generate(cells, "", false, type)));
        }

        return rows;
    }

}