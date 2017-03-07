import {Row} from "../components/Row";
import {TableData} from "../utils/TableData";
import {RowElement} from "./RowElement";
import {Cell} from "../components/Cell";
import {EventManager} from "../utils/EventManager";
import {Paginator} from "../components/Paginator";
import {WidgetBar} from "../components/WidgetBar";
import {TableElement} from "./TableElement";
import {ButtonBar} from "../components/ButtonBar";
import {FilterBar} from "../components/FilterBar";
import {MetaData} from "../entities/MetaData";
import {CellElement} from "./CellElement";

// declare const $:JQueryStatic;

/**
 * TODO: implement paging
 * TODO: implement hiding
 * **/

export class Table {
    private _header: Row;
    private _body: Array<Row> = [];
    private _footer: Row;
    private _filterBars: Array<FilterBar> = [];
    private _container: JQuery;
    private _table: JQuery;
    private _tableBody: JQuery;
    private _tableHeader: JQuery;
    private _tableFooter: JQuery;
    private paginator: Paginator;
    private buttonBar: ButtonBar;
    private _metaData: MetaData<string>;

    public static CLASSES = {
        tableContainer: '-js-rt-container',
        table: '-js-rt-table',
        tableBody: '-js-rt-tableBody',
        tableHeader: '-js-rt-tableHeader',
        tableFooter: '-js-rt-tableFooter',
        selected: '-js-rt-selected',
        readOnly: '-js-rt-readOnly',
        input: '-js-rt-input'
    };


    constructor(options) {
        EventManager.makeGlobal();
        this.paginator = new Paginator(this);
        this.metaData = new MetaData<string>(options.metaData);
        this.load(options);
    }

    public load(options: TableElement<string>) {
        this.loadFromTableData(this.toTableData(options));
    }

    private toTableData(options: TableElement<string>): TableData {
        const body: Array<RowElement> = [];

        let buttonBar: ButtonBar;
        if (options.buttons) {
            buttonBar = ButtonBar.from(this, options.buttons)
        }

        if (options.body) {
            options.body.forEach(function (row) {
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

        if (options.filterBars) {
            options.header.forEach((element: CellElement) => {
                const filter = options.filterBars[element.name] &&
                    FilterBar.from(options.filterBars[element.name]);

                if (filter) {
                    element.readOnly = true;
                    element.filter = filter;
                    this.filterBars.push(element.filter);
                }

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
            },
            buttonBar: buttonBar
        };
    }

    private loadFromTableData(tableData: TableData) {
        this.header = Row.from(tableData.header, this);
        tableData.body.forEach((element: RowElement, i: number) => {
            this.body[i] = Row.from(element, this);
        });
        this.footer = Row.from(tableData.footer, this);
        this.buttonBar = tableData.buttonBar;
        if (this.buttonBar) {
            this.buttonBar.prepend(this);
        }
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

    public getColumn(columnIndex: number, withHeader: boolean = false, withFooter: boolean = false): Array<Cell> {
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

    get tableFooter(): JQuery {
        return this._tableFooter;
    }

    set tableFooter(value: JQuery) {
        this._tableFooter = value;
    }

    get footer(): Row {
        return this._footer;
    }

    set footer(value: Row) {
        this._footer = value;
    }

    get header(): Row {
        return this._header;
    }

    set header(value: Row) {
        this._header = value;
    }

    get body(): Array<Row> {
        return this._body;
    }

    set body(value: Array<Row>) {
        this._body = value;
    }

    get filterBars(): Array<FilterBar> {
        return this._filterBars;
    }

    set filterBars(value: Array<FilterBar>) {
        this._filterBars = value;
    }

    get container(): JQuery {
        return this._container;
    }

    set container(value: JQuery) {
        this._container = value;
    }

    get table(): JQuery {
        return this._table;
    }

    set table(value: JQuery) {
        this._table = value;
    }

    get tableBody(): JQuery {
        return this._tableBody;
    }

    set tableBody(value: JQuery) {
        this._tableBody = value;
    }

    get tableHeader(): JQuery {
        return this._tableHeader;
    }

    set tableHeader(value: JQuery) {
        this._tableHeader = value;
    }

    get metaData(): MetaData<string> {
        return this._metaData;
    }

    set metaData(value: MetaData<string>) {
        this._metaData = value;
    }
}