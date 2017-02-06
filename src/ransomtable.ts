/**
 * TODO: Replace all console.error calls with exceptions
 * TODO: Provide rudimentary column and row manipulation methods
 * TODO: Provide rudimentary cell styling possibility
 * TODO: Provide cell edit feature
 * TODO: Implement paging
 * */
declare const $: any;

(function ($) {
    $.widget("ransomware.table", {

        /**
         * Default options section
         * */
        options: {
            classes: {
                tableContainer: "-js-rt-container",
                table: "-js-rt-table",
                tableBody: "-js-rt-tableBody",
                tableHeader: "-js-rt-tableHeader",
                tableFooter: "-js-rt-tableFooter",
                cell: "-js-rt-cell",
                row: "-js-rt-row",
                selected: "-js-rt-selected",
                readOnly: "-js-rt-readOnly"
            },
            fillStrategy: {
                name: "columns", // rows | columns | cells
                stride: 1
            },
            onLoad: function (widget, table) {
                console.info("Default onLoad was triggered");
            }
        },

        tableBodyData: [],
        lastDataHash: undefined,
        bounds: [0, 0],
        fillStrategy: undefined,


        /**
         * Table components
         * */
        tableContainer: undefined,
        table: undefined,
        tableBody: undefined,
        tableHeader: undefined,
        tableFooter: undefined,

        _create: function () {
            this._setProperties(this.options);
            return this;
        },

        load: function (payload, refresh) {

            const dataHash = this._getHash(payload);
            if (dataHash === this.lastDataHash && !refresh) {
                console.info("Took tableBodyData from cache.");
                return this;
            }

            this.lastDataHash = dataHash;
            this.tableBodyData = payload.body;

            let fillStrategy = this._getFillStrategy();

            if (!fillStrategy) {
                console.error("Please provide valid fill strategy.");
                return;
            }

            $.proxy(this._addHeader, this)(payload.header);
            $.proxy(fillStrategy, this)(payload.body, this.options.onLoad);
            $.proxy(this._addFooter, this)(payload.footer);

            return this;
        },

        render: function () {
            this.element .append($(this.tableContainer));
            return this;
        },

        edit: function (column, row) {

        },
        isInBounds: function (column, row) {

        },
        get: function (column, row) {

        },

        getColumn: function (column) {
            return this.tableBody.find("tr:nth-child(" + column + ")");
        },

        getRow: function (row) {
        },

        getColumnByName: function (columnName) {

        },

        getRowByName: function (rowName) {

        },

        _recalculateBounds: function () {

            const bounds = [];
            const data = this.tableBodyData;

            if (!(this.tableBodyData instanceof Array)) {
                console.error("Data has to be provided in array-ish format.");
                return this;
            }

            let count = this.fillStrategy && this.fillStrategy.stride;

            if (!this.fillStrategy.name) {
                console.error("FillStrategy name has to be provided - and has to match columns|rows|cells !");
                return this;
            }

            if (count === 0) {
                console.error("FillStrategy count has to be !== 0 because it is used as a denominator !");
                return this;
            }

            switch (this.fillStrategy.name) {
                case "rows":
                    this.bounds.push(count);
                    this.bounds.push(data.length / count);
                    break;

                case "columns":
                    this.bounds.push(data.length / count);
                    this.bounds.push(count);
                    break;
            }

            if ((data.length / count) * count !== data.length) {
                console.error("The data.length has to be a multiple of this.fillStrategy.stride !");
                return this;
            }

            this.bounds = bounds;
            return this;
        },
        getFillStrategy: function () {
            return this.fillStrategy;
        },
        _getFillStrategy: function () {

            switch (this.fillStrategy.name) {

                case "rows":
                    return this._fillRows;

                case "columns":
                    return this._fillColumns;

                case "cells":
                    return this._fillCells;
            }

            return undefined;
        },
        /**
         * Fill strategies
         * **/
        getStrategies: function () {
            return ["rows", "columns", "cells"];
        },

        _getHash: function (object) {

            switch (typeof object) {
                case  "object":
                    return this._hashcode(JSON.stringify(object));
                case "string":
                    return this._hashcode(object);
            }

            return false;
        },

        /**
         * Analogue to java hashcode except that shifting bits is slower
         * than numerical hashing.
         * Find test results here: http://jsperf.com/hashing-strings
         * */
        _hashcode: function (string) {
            let result = 0,
                length = string.length;
            for (let i = 0; i < length; i++) {
                result = result * 31 + string.charCodeAt(i);
            }
            return result;
        },
        /**
         * Private methods
         * **/

        _setProperties: function (options) {
            this.fillStrategy = options.fillStrategy;
            this._addContainer(options);
            this._addTable(options);
            this.load(options.data, true);
            this._recalculateBounds();
            return this;
        },
        _addHeader: function (headers: Array<string>) {
            this._clearTableHeader();
            let $row = $("<tr>");
            headers.forEach(function (header, i) {
                $row.append($("<th>").text(header));
            });
            this.tableHeader.append($row);
        },
        _addFooter: function (footers: Array<string>) {
            this._clearTableFooter();
            let $row = $("<tr>");
            footers.forEach(function (footer, i) {
                $row.append($("<td>").text(footer));
            });
            this.tableFooter.append($row);
        },
        _addContainer: function (options) {
            this.tableContainer = $("<div>").addClass(this.options.classes.tableContainer);
            return this;
        },
        _addTable: function (options) {

            if (!this.tableContainer) {
                console.error("ransomtable._addContainer() has to be called prior to ransomtable._addTable()");
                return this;
            }

            this.table = $("<table>").addClass(this.options.classes.table).appendTo(this.tableContainer);
            this.tableBody = $("<tbody>").addClass(this.options.classes.tableBody).appendTo(this.table);
            this.tableFooter = $("<tfoot>").addClass(this.options.classes.tableFooter).appendTo(this.table);
            this.tableHeader = $("<thead>").addClass(this.options.classes.tableHeader).appendTo(this.table);
            return this;
        },

        _addRow: function (options) {
        },

        _addColumn: function (rows, data) {
        },

        _fillRows: function (rows) {
        },

        _clearTable: function () {
            this.table.empty();
        },

        _clearTableContent: function () {
            this.tableBody.empty();
        },

        _clearTableHeader: function () {
            this.tableHeader.empty();
        },

        _clearTableFooter: function () {
            this.tableFooter.empty();
        },

        _fillColumns: function (columnDataList) {
            debugger;
            const stride = this.fillStrategy && this.fillStrategy.stride;

            if (!columnDataList) {
                console.error("ransomtable.load() has to be called prior to ransomtable._fillColumns!");
                return this;
            }

            if (stride === 0) {
                console.error("this.fillStrategy.stride may not be null because it is used as a denominator");
                return this;
            }

            let rows = this._generateRows(columnDataList.length / stride);

            if (!this.table) {
                console.error("ransomtable._addTable() has to be called prior to ransomtable._fillColumns!");
                return this;
            }

            this._clearTableContent();

            if (!rows || !rows.length || !columnDataList.length || rows.length * stride !== columnDataList.length) {
                console.error("The same amount of rows and tableBodyData objects has to be provided.");
                return this;
            }

            let tableRows = [];
            const self = this;
            columnDataList.forEach(function (data, i) {
                let $row = tableRows[i % stride] ? tableRows[i % stride] : $(rows[i % stride]);
                if (tableRows.length < stride) {
                    tableRows.push($row);
                }
                let $cell = $("<td>");
                $row.append($cell.text(data));
                if (i >= columnDataList.length - stride) {
                    self.tableBody.append($row);
                }
            });


            return this;
        },

        _generateRows: function (n: number) {
            const rows = [];

            for (let i = 0; i < n; i++) {
                rows.push($("<tr>"));
            }

            return rows;
        },
        _fillCells: function (data, cells) {


        }
    });

}($));