import {Row} from "./Row";
import {TableData} from "./TableData";
import {RowElement} from "./RowElement";
import {Cell} from "./Cell";
import {Range} from "./Range";
declare const $: any;

/**
 * TODO: implement paging
 * **/

export class Table {

    public header: Row;
    public body: Array<Row> = [];
    public footer: Row;

    public container: any;
    public table: any;
    public tableBody: any;
    public tableHeader: any;
    public tableFooter: any;

    private static VISIBLE_ROWS_PER_PAGE: number = 20;
    private currentPage: number = 0;

    private visibility: Range = new Range(0, 0);
    public static classes = {
        tableContainer: '-js-rt-container',
        table: '-js-rt-table',
        tableBody: '-js-rt-tableBody',
        tableHeader: '-js-rt-tableHeader',
        tableFooter: '-js-rt-tableFooter',
        cell: '-js-rt-cell',
        headerCell: '-js-rt-headerCell',
        row: '-js-rt-row',
        headerRow: '-js-rt-header-row',
        footerRow: '-js-rt-footer-row',
        selected: '-js-rt-selected',
        readOnly: '-js-rt-readOnly',
        input: '-js-rt-input'
    };

    constructor(options) {
        let self = this;
        const body: Array<RowElement> = [];

        if (options.body) {
            options.body.forEach(function (row) {
                body.push({
                    type: "body",
                    cellElements: row
                });
            });
        }

        let tableData: TableData = {
            body: body,
            footer: {
                type: "footer",
                cellElements: options.footer
            }, header: {
                type: "header",
                cellElements: options.header
            },


        };

        self.header = Row.from(tableData.header, self);
        body.forEach(function (element: RowElement, i: number) {
            self.body[i] = Row.from(element, self);
        });
        self.footer = Row.from(tableData.footer, self);
        self.visibility.max = self.body.length < Table.VISIBLE_ROWS_PER_PAGE ? self.body.length : Table.VISIBLE_ROWS_PER_PAGE;
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

        this.body.forEach(function (row, i) {
            column[i] = row.get(columnIndex);
        });

        return column.filter(function (value) {
            return value !== null;
        });
    }

    public getRow(rowIndex: number): Row {
        return this.body.length > rowIndex && rowIndex >= 0 ? this.body[rowIndex] : null;
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

        self.calculatePageVisibility();

        this.table.append(this.header.render(self.tableHeader));

        this.body.forEach(function (row, i) {
            if (self.visibility.isLeftInclusive(i)) {
                row.render(self.tableBody);
            }
        });

        this.table.append(self.tableBody);
        this.table.append(this.footer.render(self.tableFooter));
        this.table.appendTo(this.container);
        $(node).append(this.container);
        return this;
    }

    private calculatePageVisibility() {
        const self: Table = this;
        self.visibility.min = self.currentPage * Table.VISIBLE_ROWS_PER_PAGE;
        self.visibility.max = (self.currentPage + 1) * Table.VISIBLE_ROWS_PER_PAGE;
    }


}
