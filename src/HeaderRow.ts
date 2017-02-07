import {Row} from "./Row";
import {Cell} from "./Cell";
declare const $: any;

export class HeaderRow extends Row{


    constructor(cells: Array<Cell>, type) {
        super(cells, "header");
    }
}