import {Map} from "../utils/Map";
export class MetaData<T> {
    private data: {[key: string]: T} = {};


    constructor(data: {[p: string]: T} ={}) {
        this.data = data;
    }

    public has(key: string) {
        return !!this.data[key];
    }

    public get(key: string) {
        return this.data[key] ? this.data[key] : false;
    }

    public add(key: string, value: T) {
        this.data[key] = value;
    }

    public addAll(map: Map<T>) {
        Object.keys(map).forEach((key: string) => {
            this.add(key, map[key]);
        });
    }

    public remove(key: string): T|boolean {
        if (this.data[key]) {
            const data = this.data[key];
            delete this.data[key];
            return data;
        }
        return false;
    }

}