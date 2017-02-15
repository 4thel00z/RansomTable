import {RowElement} from "../elements/RowElement";
export interface  TableData {
    header: RowElement,
    footer: RowElement,
    body: Array<RowElement>
}