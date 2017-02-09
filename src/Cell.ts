import {Table} from './Table';
import {CellElement} from "./CellElement";
import {ElementType} from "./ElementType";
import {EditField} from "./EditField";
declare const $: any;

export class Cell {

    public content: string;
    public readOnly: boolean;
    public type: ElementType;
    public editMode: boolean = false;
    public element: any;
    public classes: Array<string>;
    public cache: string;
    public editField: EditField;

    private constructor(content: string, readOnly: boolean = false, type: ElementType = ElementType.BODY, classes: Array<string> = []) {
        this.content = content;
        this.readOnly = readOnly;
        this.type = type;

        switch (type) {
            case ElementType.FOOTER:
            case ElementType.BODY:
                this.element = $('<td>');
                break;

            case ElementType.HEADER:
                this.element = $('<th>');
                break;
        }

        if (this.readOnly) {
            this.element.addClass(Table.classes.readOnly);
        }
        if (this.classes) {
            this.element.addClass(this.classes.join(' '));
        }
        this.element.text(content);
        this.editField = new EditField();
    }

    public edit() {
        this.editField.edit(this);
    }

    public static generate(n: number, element: CellElement): Array<Cell> {
        const cells: Array<Cell> = [];

        for (let i = 0; i < n; i++) {
            cells.push(Cell.from(element));
        }

        return cells;
    }

    static from(cellElement: CellElement) {
        return new Cell(cellElement.content, cellElement.readOnly, cellElement.type, cellElement.classes)
    }

    static fromArray(cellElements: Array<CellElement>): Array<Cell> {
        const cells: Array<Cell> = [];

        cellElements.forEach(function (element) {
            cells.push(Cell.from(element));
        });

        return cells;
    }
}