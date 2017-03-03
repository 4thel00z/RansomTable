import {Row} from "./Row";
import {Table} from "../elements/Table";
import {ButtonElement} from "../elements/ButtonBarElement";
export class Button {

    private row: Row;
    private onClick: (row: Row) => boolean;
    private element: JQuery;

    private static CLASSES: any = {
        icon: "-js-rt-button-icon"
    };

    private static FUNCTIONS: {[name: string]: (row: Row) => boolean} = {

        "default": (row: Row): boolean => {
            alert("This row has " + row.getSize() + " cells!");
            return false;
        }
    };
    private icon: string;


    constructor(row: Row, onClick: (row: Row) => boolean, icon: string) {
        this.row = row;
        this.onClick = onClick;
        this.icon = icon;

    }

    public static generateButton(table: Table, row: number, button: ButtonElement): Button {
        return new Button(table.getRow(row), Button.FUNCTIONS[button.onClick], button.icon);
    }

    public static generateButtons(table: Table, buttonElements: Array<ButtonElement>): Array<Button> {
        return buttonElements.map((button: ButtonElement, i: number) => {
            return Button.generateButton(table, i, button);
        });
    }

    public  render(): JQuery {
        return $("<i>")
            .addClass(["fa", "fa-" + this.icon, Button.CLASSES.icon].join(" ")).click((event: Event): boolean => {
                if (this.onClick) {
                    return this.onClick(this.row);
                }
            });
    }
}
