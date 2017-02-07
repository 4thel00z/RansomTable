import {Table} from './Table';
declare const $: any;

export class Cell {

    private content: string;
    private readOnly: boolean;
    private type: 'header'|'footer'|'default';
    private _editMode: boolean = false;
    private element: any;


    constructor(content: string, readOnly: boolean = false, type: 'header'|'footer'|'default' = 'default') {
        this.content = content;
        this.readOnly = readOnly;
        this.type = type;

        switch (type) {
            case 'footer':
            case 'default':
                this.element = $('<td>');
                break;

            case 'header':
                this.element = $('<th>');
                break;
        }

        if (this.readOnly) {
            this.element.addClass(Table.classes.readOnly);
        }
    }


    public edit() {

        if (this.readOnly) {
            return;
        }
        //TODO: finish me !
    }

    get editMode(): boolean {
        return this._editMode;
    }

    public static generate(n: number, content: string = '',
                           readOnly: boolean = false,
                           type: 'header'|'footer'|'default'): Array<Cell> {
        const cells: Array<Cell> = [];

        for (let i = 0; i < n; i++) {
            cells.push(new Cell(content, readOnly, type));
        }

        return cells;
    }
}