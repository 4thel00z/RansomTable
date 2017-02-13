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

        table: undefined,

        /**
         * Default options section
         * */
        options: {},

        _create: function () {
            this.table = new Table({
                header: this.options.header,
                footer: this.options.footer,
                body: this.options.body
            });

            this._setup();
        },

        render: function (initialize: boolean) {
            let table: Table = this.table;
            if (table) {
                table.render(this.element, initialize);
            }
            return this;
        },

        load: null,

        /*
         * Zero indexed !
         * */

        getCell: null,
        getColumn: null,
        getRow: null,

        /**
         * Private methods
         * **/

        addRow: null,
        addColumn: null,
        remove: null,
        clear: null,
        hide: null,

        _setup: function () {
            this.load = this.table.load;
            this.getCell = this.table.getCell;
            this.getColumn = this.table.getColumn;
            this.getRow = this.table.getRow;
            this.remove = this.table.remove;
            this.clear = this.table.clear;
            this.hide = this.table.hide;
        }

    })
    ;

}($));