import {Table} from "../elements/Table";

export interface FilterHandler {
    (table: Table): boolean
}
