import {Table} from "../elements/Table";
import {Map} from "gulp-typescript/release/utils";
import {Cell} from "./Cell";
import {FionaFilter} from "../entities/FionaFilter";
import {FilterHandler} from "./FilterHandler";

export class FilterBar {

    private _element: JQuery;
    private _onChange: FilterHandler;
    private _cell: Cell;

    public static CLASSES: Map<string> = {
        "container": "-js-rt-filterbar-container",
        "input": "-js-rt-filterbar-input"
    };

    public static FUNCTIONS: Map<FilterHandler> = {

        "fiona": (table: Table) => {
            const filter = new FionaFilter();

            filter.equal("g.ud_id", table.metaData.get("udNumber"));

            table.filterBars.forEach((filterBar: FilterBar, i: number) => {
                const constraints = (<FionaFilter>filter).handle(filterBar);
                // TODO: implement backend logic here !
                console.log(constraints);
            });

            return false;
        }

    };

    constructor(onChange: FilterHandler) {
        const $input = $("<input>").addClass([FilterBar.CLASSES["input"],Table.CLASSES.input].join(" "));
        this.element = $("<div>").addClass([FilterBar.CLASSES["container"]].join(" ")).append($input);
        this.onChange = onChange;
    }


    public static from(element: string): FilterBar {
        const key = element && element.toLowerCase() || "fiona";
        return key && new FilterBar(FilterBar.FUNCTIONS[key]) || undefined;
    }

    public render(table: Table): JQuery {
        return this.element.change((event: JQueryEventObject) => {
            if (this.onChange) {
                return this.onChange(table);
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


