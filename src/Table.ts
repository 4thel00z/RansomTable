import {Row} from "./Row";
import {TableData} from "./TableData";
import {RowElement} from "./RowElement";
import {Cell} from "./Cell";
import "jquery";
import {EventManager} from "./EventManager";
import {CellElement} from "./CellElement";
import {Paginator} from "./Paginator";

/**
 * TODO: implement paging
 * TODO: implement hiding
 * **/

export class Table {

    public header: Row;
    public body: Array<Row> = [];
    public footer: Row;

    public container: JQuery;
    public table: JQuery;
    public tableBody: JQuery;
    public tableHeader: JQuery;
    public tableFooter: JQuery;

    private paginator: Paginator;

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
        EventManager.makeGlobal();
        this.load(options);
        this.paginator = new Paginator(this);
        this.calculatePageVisibility();
    }

    public load(options: {
        footer: Array<CellElement>,
        header: Array<CellElement>,
        body: Array<Array<CellElement>>
    }) {
        this.loadFromTableData(this.toTableData(options));

    }

    private toTableData(options: IRawTableOptions): TableData {
        const body: Array<RowElement> = [];

        if (options.body) {
            options.body.forEach(function (row) {
                body.push({
                    type: "body",
                    cellElements: row
                });
            });
        }

        return {
            body: body,
            footer: {
                type: "footer",
                cellElements: options.footer
            }, header: {
                type: "header",
                cellElements: options.header
            }

        };
    }

    private loadFromTableData(tableData: TableData) {
        const self: Table = this;
        self.header = Row.from(tableData.header, self);
        tableData.body.forEach(function (element: RowElement, i: number) {
            self.body[i] = Row.from(element, self);
        });
        self.footer = Row.from(tableData.footer, self);
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
        this.table = $("<table>").addClass(Table.classes.table);
    }

    private addTableContainer() {
        this.container = $("<div>").addClass(Table.classes.tableContainer);
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

        this.calculatePageVisibility();

        this.table.append(this.header.render(self.tableHeader));

        this.body.forEach(function (row, i) {
            if (self.paginator.isVisible(i)) {
                row.render(self.tableBody);
            }
        });

        this.table.append(self.tableBody);
        this.table.append(this.footer.render(self.tableFooter));
        this.table.appendTo(this.container);
        this.container.append(self.paginator.render());
        $(node).append(self.container);
        return self;
    }

    private calculatePageVisibility() {
        this.paginator.count = this.getCount();
        this.paginator.update();
    }


    public hide() {
        throw new Error("Implement me!");
    }


    private clearTableHeader() {
        this.tableHeader.empty();
    }

    private clearTableFooter() {
        this.tableFooter.empty();
    }

    private clearTableBody() {
        this.tableBody.empty();
    }

    private clearTable() {
        this.table.empty();
    }

    private clearTableContainer() {
        this.container.empty();
    }

    public clear() {
        this.clearTableHeader();
        this.clearTableBody();
        this.clearTableFooter();
        this.clearTable();
        this.clearTableContainer();
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

    public remove() {
        this.removeTableHeader();
        this.removeTableBody();
        this.removeTableFooter();
        this.removeTable();
        this.removeTableContainer();
        EventManager.removeGlobal();
    }

    public getCount(): number {

        return this.body ? this.body.length : 0;
    }
}


interface IRawTableOptions {
    footer: Array<CellElement>,
    header: Array<CellElement>,
    body: Array<Array<CellElement>>
}