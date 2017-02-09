import {CellElement, ICellElement} from "./CellElement";
import {ElementType} from "./ElementType";
export abstract class RowElement {
    public type?: "header"|"body"|"footer";
    public cellElements: Array<CellElement>;
}