import {ElementType} from "./ElementType";
export abstract class CellElement {
    content: string = "";
    readOnly: boolean = false;
    classes: Array<string> = [];
    type: ElementType = ElementType.BODY;
}


export class SimpleCellElement extends CellElement {

    public static times(n: number): Array<CellElement> {
        const elements: Array<CellElement> = [];
        for (let i = 0; i < n; i++) {
            elements.push(new SimpleCellElement());
        }
        return elements;
    }
}