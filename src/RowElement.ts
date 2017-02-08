import {CellElement} from "./CellElement";
import {ElementType} from "./ElementType";
export interface RowElement {
    type: ElementType;
    cellElements: Array<CellElement>
}