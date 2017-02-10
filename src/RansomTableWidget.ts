import {Table} from "./Table";
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
        options: {},


        _create: function () {
            let self = this;
            self.table = new Table({
                header: this.options.header,
                footer: this.options.footer,
                body: this.options.body
            });

            this.load = this.table.load;
        },

        load: undefined,

        render: function (initialize: boolean) {
            //this.element .append($(this.tableContainer));
            const self = this;
            let table: Table = self.table;
            if (table) {
                table.render(this.element, initialize);
            }
            return this;
        },

        /*
         * Zero indexed !
         * */

        getCell: function (column, row) {
            const self = this;
            let table: Table = self.table;
            if (table) {
                return table.getCell(column, row)
            }
            return null;
        },
        getColumn: function (column) {
            const self = this;
            return self.table.getColumn(column);
        },
        getRow: function (row) {
            const self = this;
            return self.table.getRow(row);
        },

        /**
         * Private methods
         * **/


        addRow: function (options) {

        },

        addColumn: function (rows, data) {
        },


        clearTable: function () {
            const self = this;
            let table: Table = self.table;
            if (table) {
                table.empty();
            }

        },

        clear: function () {
            const self = this;
            let table: Table = self.table;
            if (table) {
                table.empty();
            }
        },
        hide: function () {
            const self = this;
            let table: Table = self.table;
            if (table) {
                table.hide();
            }
        }

    })
    ;

}($));