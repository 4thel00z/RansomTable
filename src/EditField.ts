import {Table} from "./Table";
import {Cell} from "./Cell";
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

    public edit(cell: Cell) {
        if (cell.readOnly) {
            return;
        }
        if (cell.editMode) {
            let text: string = this.inputField.val();
            cell.element.empty();
            cell.element.text(text);
        }
        else {
            cell.cache = cell.element.text();
            cell.element.empty();
            cell.element.append(this.inputField.val(cell.cache));
        }
        cell.editMode = !cell.editMode;
    }
}