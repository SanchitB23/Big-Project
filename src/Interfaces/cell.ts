import {CellTypes} from "../constants/cell-types";

export interface Cell {
    id: string,
    type: CellTypes
    content: string
}
