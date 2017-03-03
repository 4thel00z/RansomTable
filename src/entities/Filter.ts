export class Filter {

    protected constraints = [];

    public constructor() {
    }

    public  equal(name: string, value: string|boolean|number) {
        this.constraints.push(["equal", name, value]);
    }

    public  notEqual(name: string, value: string|boolean|number) {
        this.constraints.push(["not_equal", name, value]);
    }

    public contains(name: string, value: string|boolean|number) {
        this.constraints.push(["like", name, "*" + value + "*"]);
    }

    public notNull(name: string) {
        this.constraints.push(["is_not_null", name, " "]);
    }

    public boundingBox(size: string|number, geometry: string|number) {
        this.constraints.push(['bbox', 'the_geom', size, geometry]);
    }

    public generate() {
        return this.constraints.length > 0 ? {
                'and': this.constraints
            } : {};
    }

}