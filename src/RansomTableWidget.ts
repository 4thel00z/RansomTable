import {Table} from "./elements/Table";
// declare const $:JQueryStatic;

(function ($) {
    $.widget("ransomware.table", {

        table: undefined,

        /**
         * Default options section
         * */
        options: {},
        setTable: function (options) {
            this.table = new Table(options);
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
