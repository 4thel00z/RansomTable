import {ElementType} from "./ElementType";
import {WidgetBar} from "../components/WidgetBar";

export interface  CellElement {
    content: string ;
    readOnly: boolean ;
    classes: Array<string> ;
    type: ElementType;
    widgetBar ?: WidgetBar;
}
