(function ($) {

    $.widget("ransomware.table", {

        /**
         * Default options section
         * */
        options: {
            classes: {
                container: "-js-rt-container",
                table: "-js-rt-table",
            },
            fillStrategy: "rows" // rows | columns | cells

        },

        rawData: [],
        bounds: [0, 0],
        fillStrategy: undefined,

        _create: function (options) {
            this._setProperties(options);
        },

        load: function (data, refresh) {
            this.rawData = data;

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
            let data = this.rawData;
            let size = data.length;

        },
        getFillStrategy: function () {

            return this.fillStrategy;
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
            this.rawData = options.data;
            this._recalculateBounds();
        },
        _addHeader: function (options) {

        },
        _addTable: function (options) {

        },
        _addRow: function (options) {

        },
        _addColumn: function (options) {

        }

    });

}($));