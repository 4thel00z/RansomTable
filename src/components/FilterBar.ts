import {Row} from "./Row";
import {Table} from "../elements/Table";
import {Map} from "gulp-typescript/release/utils";
import {Filter} from "../entities/Filter";
import {Cell} from "./Cell";
import {FionaFilter} from "../entities/FionaFilter";

export class FilterBar {

    private _element: JQuery;
    private _onChange: FilterHandler;
    private _cell: Cell;

    public static CLASSES: Map<string> = {
        "container": "-js-rt-filterbar-container",
        "input": "-js-rt-filterbar-input"
    };

    public static FUNCTIONS: Map<FilterHandler> = {

        "fiona": (table: Table, columns: Array<Row>, currentString: string) => {
            const filter = new FionaFilter();

            filter.equal("g.ud_id", table.metaData.get("udNumber"));

            table.filterBars.forEach((filterBar: FilterBar, i: number) => {
                (<FionaFilter>filter).handle(filterBar);
            });

            return false;
        }

    };

    constructor(onChange: FilterHandler) {
        const $input = $("<input>").addClass([FilterBar.CLASSES["input"]].join(" "));
        this.element = $("<div>").addClass([FilterBar.CLASSES["container"]].join(" ")).append($input);
        this.onChange = onChange;
    }

    public render(table: Table, columns: Array<Row>): JQuery {
        return this._element.change((event: JQueryEventObject) => {
            if (this._onChange) {
                return this._onChange(table, columns, $(event.target).val());
            }
        });
    }

    get element(): JQuery {
        return this._element;
    }

    set element(value: JQuery) {
        this._element = value;
    }

    get onChange(): FilterHandler {
        return this._onChange;
    }

    set onChange(value: FilterHandler) {
        this._onChange = value;
    }

    get cell(): Cell {
        return this._cell;
    }

    set cell(value: Cell) {
        this._cell = value;
    }
}


export interface FilterHandler {
    (table: Table, columns: Array<Row>, currentString: string): boolean
}
