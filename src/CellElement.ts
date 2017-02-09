import {ElementType} from "./ElementType";
export abstract class CellElement {
    public content: string = "";
    public readOnly: boolean = false;
    public classes: Array<string> = [];
    public type: ElementType = ElementType.BODY;

}


export class SimpleCellElement extends CellElement {


    constructor(iCellElement: ICellElement) {
        super();
        this.content = iCellElement.content ? iCellElement.content : "";
        this.readOnly = iCellElement.readOnly ? iCellElement.readOnly : false;
        this.classes = iCellElement.classes ? iCellElement.classes : [];
        this.type = iCellElement.type ? iCellElement.type : ElementType.BODY;
    }

    public static times(n: number, iCellElement: ICellElement = {}, type: "header"|"body"|"footer" = "body"): Array<CellElement> {
        const elements: Array<CellElement> = [];
        for (let i = 0; i < n; i++) {
            iCellElement.type = iCellElement.type ? iCellElement.type : type;
            elements.push(new SimpleCellElement(iCellElement));
        }
        return elements;
    }


    public static fromArray(iCellElements: Array<ICellElement>, type: "header"|"body"|"footer" = "body"): Array<CellElement> {
        const elements: Array<CellElement> = [];
        iCellElements.forEach(function (iCellElement: ICellElement) {
            iCellElement.type = iCellElement.type ? iCellElement.type : type;
            elements.push(new SimpleCellElement(iCellElement));
        });
        return elements;
    }

}

export abstract class ICellElement {
    public content?: string = "";
    public readOnly?: boolean = false;
    public type?: "header"|"body"|"footer";
    public classes?: Array<string> = [];
}