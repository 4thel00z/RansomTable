import {Button} from "./Button";
import {Cell} from "./Cell";
import {Table} from "../elements/Table";
import {ElementType} from "../elements/ElementType";
import {Row} from "./Row";
import {ButtonElement} from "../elements/ButtonBarElement";
export class ButtonBar {

    constructor(buttons: Array<Button>) {
        this.buttons = buttons;
    }

    private buttons: Array<Button>;
    public static CLASSES: any = {
        container: "-js-rt-buttonbar-container"
    };

    public static from(table: Table, elements: Array<ButtonElement>): ButtonBar {
        return new ButtonBar(Button.generateButtons(table, elements))
    }

    public prepend(table: Table) {
        if (table.header) {
            let headerCell: Cell = Cell.getPlaceholder(ElementType.HEADER, [], table);
            table.header.prepend(headerCell);
        }

        table.body.forEach((row: Row, i: number) => {
            let cell: Cell = Cell.getPlaceholder(ElementType.BODY, [], table);
            cell.buttonBar = this;
            row.prepend(cell);
        });

        if (table.footer) {
            let footerCell: Cell = Cell.getPlaceholder(ElementType.FOOTER, [], table);
            table.footer.prepend(footerCell);
        }
    }

    public render() {
        const element: JQuery = $("<div>").addClass(ButtonBar.CLASSES.container);
        this.buttons.forEach((button: Button) => {
            element.append(button.render());
        });
        return element;
    }
}