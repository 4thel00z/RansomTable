import {Row} from "./Row";
declare const $: any;

export class Table {

    private rows: Array<Row>;

    public static classes = {
        tableContainer: '-js-rt-container',
        table: '-js-rt-table',
        tableBody: '-js-rt-tableBody',
        tableHeader: '-js-rt-tableHeader',
        tableFooter: '-js-rt-tableFooter',
        cell: '-js-rt-cell',
        row: '-js-rt-row',
        selected: '-js-rt-selected',
        readOnly: '-js-rt-readOnly',
        input: '-js-rt-input'
    };


    constructor(data) {
    }


    public static generateRows(n: number) {
        const rows = [];

        for (let i = 0; i < n; i++) {
            rows.push($('<tr>'));
        }

        return rows;
    }

}