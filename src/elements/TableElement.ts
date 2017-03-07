import {CellElement} from "./CellElement";
import {WidgetElement} from "./WidgetElement";
import {ButtonElement} from "./ButtonBarElement";
import {Map} from "../utils/Map";


export interface TableElement <T> {
    footer: Array<CellElement>
    header: Array<CellElement>
    body: Array<Array<CellElement>>
    widgets: {[column: number]: Array<WidgetElement>}
    buttons: Array<ButtonElement>
    filterBars?: Map<string>
    metaData?: {[key: string]: T};


}
