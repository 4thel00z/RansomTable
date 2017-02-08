import {Row} from "./Row";
import {TableData} from "./TableData";
import {RowElement} from "./RowElement";
import {Cell} from "./Cell";
declare const $: any;

/**
 * TODO: implement paging
 * **/

export class Table {

    private _header: Row;
    private rows: Array<Row> = [];
    private _footer: Row;

    private container: any;
    private table: any;
    private tableBody: any;
    private tableHeader: any;
    private tableFooter: any;

    public static classes = {
        tableContainer: '-js-rt-container',
        table: '-js-rt-table',
        tableBody: '-js-rt-tableBody',
        tableHeader: '-js-rt-tableHeader',
        tableFooter: '-js-rt-tableFooter',
        cell: '-js-rt-cell',
        row: '-js-rt-row',
        selected: '-js-rt-selected',
        readOnly: '-js-rt-readOnly',
        input: '-js-rt-input'
    };

    constructor(tableData: TableData) {
        this._header = Row.from(tableData.header);
        tableData.body.forEach(function (element: RowElement, i: number) {
            this.body[i] = Row.from(element);
        });
        this._footer = Row.from(tableData.footer);
    }

    private initializeViews() {
        this.addTableContainer();
        this.addTable();
        this.addTableBody();
        this.addTableFooter();
        this.addTableHeader();
    }

    private addTableHeader() {
        this.tableHeader = $("<thead>").addClass(Table.classes.tableHeader);
    }

    private addTableFooter() {
        this.tableFooter = $("<tfoot>").addClass(Table.classes.tableFooter);
    }

    private addTableBody() {
        this.tableBody = $("<tbody>").addClass(Table.classes.tableBody);
    }

    private addTable() {
        let self: Table = this;
        self.table = $("<table>").addClass(Table.classes.table);
    }

    private addTableContainer() {
        let self: Table = this;
        self.container = $("<div>").addClass(Table.classes.tableContainer);
    }

    private removeTableHeader() {
        this.tableHeader.remove();
    }

    private removeTableFooter() {
        this.tableFooter.remove();
    }

    private removeTableBody() {
        this.tableBody.remove();
    }

    private removeTable() {
        this.table.remove();
    }

    private removeTableContainer() {
        this.container.remove();
    }

    public getColumn(columnIndex: number, withHeader: boolean = false, withFooter: boolean = false) {
        const column: Array<Cell> = [];

        this.rows.forEach(function (row, i) {
            column[i] = row.get(columnIndex);
        });

        return column.filter(function (value) {
            return value !== null;
        });
    }

    public getRow(rowIndex: number): Row {
        return this.rows.length > rowIndex && rowIndex >= 0 ? this.rows[rowIndex] : null;
    }


    public getCell(rowIndex: number, columnIndex: number) {
        const row: Row = this.getRow(rowIndex);

        if (row !== null) {
            return row.get(columnIndex);
        }

        return null;
    }

    public render(node: any, initialize: boolean) {
        let self: Table = this;
        if (initialize) {
            this.initializeViews();
        }

        this.container.append(this._header.render(self.tableHeader));

        this.rows.forEach(function (row) {
            row.render(self.tableBody);
        });

        this.container.append(self.tableBody);
        this.container.append(this._footer.render(self.tableFooter));
        $(node).append(this.container);
    }

    get footer(): Row {
        return this._footer;
    }

    get header(): Row {
        return this._header;
    }
}
