import {CellElement} from "../CellElement";
import {WidgetElement} from "./WidgetElement";

export interface TableElement {
    footer: Array<CellElement>,
    header: Array<CellElement>,
    body: Array<Array<CellElement>>,
    widgets: {[column: number]: Array<WidgetElement>}
}
