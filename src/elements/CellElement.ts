import {ElementType} from "./ElementType";
import {WidgetBar} from "../components/WidgetBar";
import {FilterBar} from "../components/FilterBar";

export interface  CellElement {
    content: string ;
    readOnly: boolean ;
    classes: Array<string> ;
    type: ElementType;
    widgetBar ?: WidgetBar;
    name?: string
    filter?: FilterBar;
}
