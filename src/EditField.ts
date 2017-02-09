import {Table} from "./Table";
import {Cell} from "./Cell";
import {EventManager} from "./EventManager";
declare const $: any;

export class EditField {

    private inputField: any;

    constructor(content: string = "") {
        this.load(content);
    }

    private load(content: string = "") {
        this.inputField = $("<input>").addClass(Table.classes.input).val(content);
    }

    public get() {
        return this.inputField.val();
    }

    public remove() {
        this.inputField.remove();
    }

    public edit(cell: Cell, event: Event) {
       
        if (cell.readOnly) {
            return;
        }

        if (cell.editMode) {
            return;
        }
        else {
            this.enable(cell);
        }
    }

    public disable(cell: Cell) {
        let text: string = this.inputField.val();
        cell.element.empty();
        cell.element.text(text);
        cell.editMode = false;

    }

    public enable(cell: Cell) {
        cell.cache = cell.element.text();
        cell.element.empty();
        cell.element.append(this.inputField.val(cell.cache));
        cell.editMode = true;
    }

}