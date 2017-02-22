import {Row} from "../entities/Row";
import {TableData} from "../utils/UserTableData";
import {RowElement} from "./RowElement";
import {Cell} from "../entities/Cell";
import {EventManager} from "../utils/EventManager";
import {Paginator} from "../entities/Paginator";
import {WidgetBar} from "../entities/WidgetBar";
import {TableElement} from "./TableElement";

// declare const $:JQueryStatic;

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

    public static CLASSES = {
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
        this.paginator = new Paginator(this);
        this.load(options);
    }

    public load(options: TableElement) {
        this.loadFromTableData(this.toTableData(options));
    }

    private toTableData(options: TableElement): TableData {
        const body: Array<RowElement> = [];

        if (options.body) {
            options.body.forEach(function (row, i) {

                row.forEach((cell, columnIndex) => {
                    if (options.widgets && options.widgets[columnIndex]) {
                        cell.widgetBar = WidgetBar.from(options.widgets[columnIndex]);
                        cell.readOnly = true;
                    }
                });

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
        this.tableHeader = $("<thead>").addClass(Table.CLASSES.tableHeader);
    }

    private addTableFooter() {
        this.tableFooter = $("<tfoot>").addClass(Table.CLASSES.tableFooter);
    }

    private addTableBody() {
        this.tableBody = $("<tbody>").addClass(Table.CLASSES.tableBody);
    }

    private addTable() {
        this.table = $("<table>").addClass(Table.CLASSES.table);
    }

    private addTableContainer() {
        this.container = $("<div>").addClass(Table.CLASSES.tableContainer);
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

    public render(node: JQuery, initialize: boolean) {
        if (initialize) {
            this.initializeViews();
        }

        this.calculatePageVisibility();

        this.table.append(this.header.render(this.tableHeader));

        this.refreshTableBody();

        this.table.append(this.tableBody);
        this.table.append(this.footer.render(this.tableFooter));
        this.table.appendTo(this.container);
        this.container.append(this.paginator.render(this));
        $(node).append(this.container);

        return this;
    }

    public refreshTableBody() {
        this.clearTableBody();
        const self: Table = this;
        this.body.forEach((row: Row, i: number) => {
            if (self.paginator.isVisible(i)) {
                row.index = i;
                row.render(self.tableBody);
            }
        });
    }

    public refresh(node: JQuery) {
        this.clear();
        this.render(node, true);
    }

    private calculatePageVisibility() {
        this.paginator.update(this);
        this.paginator.render(this);
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

    public getSize(): number {

        return this.body ? this.body.length : 0;
    }
}