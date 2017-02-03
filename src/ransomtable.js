/**
 * TODO: Replace all console.error calls with exceptions
 * TODO: Provide rudimentary column and row manipulation methods
 * TODO: Provide rudimentary cell styling possibility
 * TODO: Provide cell edit feature
 * */
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
            fillStrategy: "rows", // rows | columns | cells
            onLoad: function (widget, table) {
            }
        },

        data: [],
        bounds: [0, 0],
        fillStrategy: undefined,

        tableContainer: undefined,
        table: undefined,
        tableBody: undefined,
        tableHeader: undefined,
        tableFooter: undefined,

        _create: function (options) {
            this._setProperties(options);
        },

        load: function (payload, refresh) {
            this.data = payload;

            let fillStrategy = this._getFillStrategy();

            if (!fillStrategy) {
                console.error("Please provide valid fill strategy.");
                return;
            }

            fillStrategy(payload, this.options.onLoad);

            if (refresh) {
                this.refresh();
            }
        },

        render: function () {

        },

        refresh: function () {

        },
        edit: function (column, row) {

        },
        isInBounds: function (column, row) {

        },
        get: function (column, row) {

        },

        getColumn: function (column) {
        },

        getRow: function (row) {
        },

        getColumnByName: function (columnName) {

        },

        getRowByName: function (rowName) {

        },

        _recalculateBounds: function () {

            let bounds = [];
            let data = this.data;
            let size = data.length;

        },
        getFillStrategy: function () {

            return this.fillStrategy;
        },
        _getFillStrategy: function () {

            switch (this.fillStrategy) {
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
            this.data = options.data;
            this._recalculateBounds();
        },
        _addHeader: function (options) {

        },
        _addContainer: function (options) {
            $("<table>").addClass(this.options.classes.table);
            this.tableContainer = $container;
            return this;
        },
        _addTable: function (options) {

            if (!this.tableContainer) {
                console.error("ransomtable._addContainer() has to be called prior to ransomtable._addTable()");
                return this;
            }

            this.table = $("<table>").addClass(this.options.classes.table);
            this.tableBody = $("<tbody>").addClass(this.options.classes.tableBody);
            this.tableFooter = $("<tfoot>").addClass(this.options.classes.tableFooter);
            this.tableHeader = $("<thead>").addClass(this.options.classes.tableHeader);

            // TODO: See if this is the only way
            //this.tableContainer.append($table);

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
        _fillColumns: function (data) {

            if (!data) {

            }

            if (!this.table) {
                console.error("ransomtable._addTable() has to be called prior to ransomtable._fillColumns!")
                return this;
            }

            this._clearTableContent();

            if (rows.length && data.length && rows.length !== data.length) {
                console.error("The same amount of rows and data objects has to be provided.")
                return this;
            }
        },

        _fillCells: function (cells) {

        }
    });

}($));