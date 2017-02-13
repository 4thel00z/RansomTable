import {Table} from './Table';
import {CellElement} from "./CellElement";
import {ElementType} from "./ElementType";
import {EditField} from "./EditField";
import {UUID} from "./UUID";
declare const $: any;

export class Cell {

    public content: string;
    public readOnly: boolean;
    public onHover: (event: Event) => boolean;
    public type: ElementType;
    public editMode: boolean = false;
    public element: any;
    public classes: Array<string>;
    public cache: string;
    public editField: EditField;
    public table: Table;

    private constructor(content: string, readOnly: boolean = false, type: ElementType = ElementType.BODY, classes: Array<string> = [], table?: Table) {
        this.content = content;
        this.readOnly = readOnly;
        this.type = type;
        this.table = table;
        switch (type) {
            case ElementType.FOOTER:
            case ElementType.BODY:
                this.element = $('<td>').addClass(Table.classes.cell);
                break;

            case ElementType.HEADER:
                this.element = $('<th>').addClass(Table.classes.headerCell);
                break;
        }

        if (this.readOnly) {
            this.element.addClass(Table.classes.readOnly);
        } else {
            this.element.click($.proxy(this.edit, this));
        }

        if (this.classes) {
            this.element.addClass(this.classes.join(' '));
        }
        this.element.text(content);
        this.element.attr("id", UUID.register(this.element));

        this.editField = new EditField(this);
    }

    public edit(event) {
        this.editField.edit(this, event);
    }

    public static generate(n: number, element: CellElement): Array<Cell> {
        const cells: Array<Cell> = [];

        for (let i = 0; i < n; i++) {
            cells.push(Cell.from(element));
        }

        return cells;
    }

    static from(cellElement: CellElement, type?: "header"|"body"|"footer", table?: Table) {
        return new Cell(cellElement.content, cellElement.readOnly, type || cellElement.type, cellElement.classes, table)
    }

    static fromArray(cellElements: Array<CellElement>, type?: "header"|"body"|"footer", table?: Table): Array<Cell> {
        const cells: Array<Cell> = [];

        if (!cellElements) return cells;

        cellElements.forEach(function (element) {
            cells.push(Cell.from(element, type, table));
        });

        return cells;
    }
}