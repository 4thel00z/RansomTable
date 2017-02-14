import {CellElement} from "./CellElement";
export abstract class RowElement {
    public type?: "header"|"body"|"footer";
    public cellElements: Array<CellElement>;
}