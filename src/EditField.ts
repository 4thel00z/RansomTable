import {Table} from "./Table";
import {Cell} from "./Cell";
import {EventManager} from "./EventManager";
declare const $: any;

export class EditField {

    private inputField: any;

    constructor(cell: Cell) {
        this.load(cell);
    }

    private load(cell: Cell) {
        this.inputField = $("<input>").addClass(Table.classes.input).val(cell.element.text());
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
            this.enable(cell, event);
            const container = cell.table.container;
            if (container) {
                container.on("mousedown." + cell.element.attr("id"), {
                    self: this,
                    cell: cell
                }, this.disable);
            }
        }
    }

    public disable(event) {
        const cell: Cell = event.data.cell;
        const self: EditField = event.data.self;
        if (EditField.inBounds(cell, event)) {
            // Clicking on the same cell has to be ignored
            return true;
        }
        let text: string = self.inputField.val();
        cell.element.empty();
        cell.element.text(text);
        cell.editMode = false;
        const container = cell.table.container;
        if (container) {
            container.off("mousedown." + cell.element.attr("id"));
        }
        let readOnlyCells = cell.table.tableBody.find("." + Table.classes.readOnly);
        return false;
    }

    public static inBounds(cell: Cell, event) {

        const clientX: number = event.clientX;
        const clientY: number = event.clientY;
        const pageX: number = event.pageX;
        const pageY: number = event.pageY;


        const element = cell.element;
        const width: number = element.outerWidth();
        const height: number = element.outerHeight();
        const offset: {top: number, left: number} = element.offset();

        return clientX >= offset.left && clientX <= offset.left + width &&
            clientY >= offset.top && clientY <= offset.top + height;

    }

    public enable(cell: Cell, event: Event) {

        const self: EditField = this;
        cell.cache = cell.element.text();
        cell.element.empty();
        cell.element.append(this.inputField.val(cell.cache));
        cell.editMode = true;

        return false;
    }

}