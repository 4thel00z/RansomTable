declare const $: any;

export class Cell {

    private content: string;
    private readOnly: boolean;
    private type: "header"|"footer"|"default";
    private editMode: boolean = false;
    private element: any;


    constructor(content: string, readOnly: boolean, type: "header"|"footer"|"default" = "default") {
        this.content = content;
        this.readOnly = readOnly;
        this.type = type;

        switch (type) {
            case "footer":
            case "default":
                this.element = $("<td>");
                break;

            case "header":
                this.element = $("<th>");
                break;
        }
    }


    public edit() {

        if (this.readOnly) return;


    }


}