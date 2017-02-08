import {RowElement} from "./RowElement";
export interface  TableData {
    header: RowElement,
    footer: RowElement,
    body: Array<RowElement>
}