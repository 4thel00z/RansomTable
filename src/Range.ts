export class Range {

    public min: number;
    public max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    //left-inclusive check
    public isLeftInclusive(i: number) {
        return i >= this.min && i < this.max;
    }
    public isInclusive(i: number) {
        return i >= this.min && i <= this.max;
    }

}