import {ElementType} from "./ElementType";
import {WidgetBar} from "./WidgetBar";

export interface  CellElement {
    content: string ;
    readOnly: boolean ;
    classes: Array<string> ;
    type: ElementType;
    widgetBar ?: WidgetBar;
}
