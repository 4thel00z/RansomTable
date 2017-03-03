import {RowElement} from "../elements/RowElement";
import {ButtonBar} from "../components/ButtonBar";
export interface  TableData {
    header: RowElement,
    footer: RowElement,
    body: Array<RowElement>,
    buttonBar: ButtonBar
}