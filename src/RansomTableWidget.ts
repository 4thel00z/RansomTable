import {Table} from "./elements/Table";
// declare const $:JQueryStatic;

(function ($) {
    $.widget("ransomware.table", {

        table: undefined,

        /**
         * Default options section
         * */
        options: {},
        _create:function(){},
        setTable: function (options) {
            this.table = new Table(options);
            this._setup();
        },
        render: null,
        refresh: null,
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
            this.load = $.proxy(this.table.load,this.table);
            this.render = (initialize: boolean) => {
                let table: Table = this.table;
                if (table) {
                    table.render(this.element, initialize);
                }
                return this;
            };
            this.refresh = () => {
                this.table.refresh(this.element)
            };
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
