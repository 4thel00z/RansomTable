import {CellElement} from "./CellElement";
import {WidgetElement} from "./WidgetElement";
import {ButtonElement} from "./ButtonBarElement";

export interface TableElement {
    footer: Array<CellElement>,
    header: Array<CellElement>,
    body: Array<Array<CellElement>>,
    widgets: {[column: number]: Array<WidgetElement>}
    buttons: Array<ButtonElement>
}
