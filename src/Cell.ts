import {Table} from './Table';
import {CellElement} from "./CellElement";
import {ElementType} from "./ElementType";
import {EditField} from "./EditField";
declare const $: any;

export class Cell {

    private _content: string;
    private _readOnly: boolean;
    private type: ElementType;
    private _editMode: boolean = false;
    private _element: any;
    private classes: Array<string>;
    private _cache: string;
    private editField: EditField;

    private constructor(content: string, readOnly: boolean = false, type: ElementType = ElementType.BODY, classes: Array<string> = []) {
        this._content = content;
        this._readOnly = readOnly;
        this.type = type;

        switch (type) {
            case ElementType.FOOTER:
            case ElementType.BODY:
                this._element = $('<td>');
                break;

            case ElementType.HEADER:
                this._element = $('<th>');
                break;
        }

        if (this._readOnly) {
            this._element.addClass(Table.classes.readOnly);
        }
        if (this.classes) {
            this._element.addClass(this.classes.join(' '));
        }

        this.editField = new EditField();
    }

    get readOnly(): boolean {
        return this._readOnly;
    }

    get editMode(): boolean {
        return this._editMode;
    }

    set editMode(value: boolean) {
        this._editMode = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get element(): any {
        return this._element;
    }

    set element(value: any) {
        this._element = value;
    }

    get cache(): string {
        return this._cache;
    }

    set cache(value: string) {
        this._cache = value;
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

}