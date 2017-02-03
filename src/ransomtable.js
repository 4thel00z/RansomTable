(function ($) {

    $.widget("ransomware.table", {

        /**
         * Default options section
         * */
        options: {
            classes: {
                container: "-js-rt-container",
                table: "-js-rt-table",
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

        /**
         * Contains the container in which the table is nested
         * */
        viewRoot : undefined,

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
        _addTable: function (options) {

            let $container = $("<div>").addClass(this.options.classes.container);
            let $table = $("<table>").addClass(this.options.classes.table);

            this.viewRoot = $container.append($table);

            return this;
        },
        _addRow: function (options) {

        },
        _addColumn: function (options) {

        },
        _fillRows: function (rows) {

        },
        _fillColumns: function (columns) {

        },
        _fillCells: function (cells) {

        }
    });

}($));