import {Filter} from "./Filter";
import {FilterBar} from "../components/FilterBar";
export class FionaFilter extends Filter {

    public handle(filterBar: FilterBar) {
        const currentText = filterBar.element.text().trim();
        const headerName: string = (<string>filterBar.cell.metaData.get("name")).toLowerCase();

        if (currentText !== '') {
            let handlerName = $.inArray(headerName, ["schlagnr", "schlag_nr", "nutz_code"]) ? "handleSchlagNumber" : "handleGenericField";
            this[handlerName](headerName, currentText);
        }
        else
            this.handleEmpty(headerName);

        // TODO: use bounding box constraint

        return this.constraints;
    }

    public handleSchlagNumber(headerName: string, currentText: string) {
        this.equal(headerName, currentText.match(/([0-9]+)/)[1]);
    }

    public handleGenericField(headerName: string, currentText: string) {
        this.contains(headerName, currentText);
    }

    public handleEmpty(headerName: string) {
        this.notNull(headerName);
        this.notEqual(headerName, '');
    }
}