import React from 'react';
import {Cell} from "../../Interfaces/cell";
import {CellType} from "../../constants/cell-types";
import Code from "../Code";
import TextToMdEditor from "../Markdown";

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
    let child: JSX.Element;
    if (cell.type === CellType.CODE) child = <Code/>
    else child = <TextToMdEditor/>

    return (
        <div>
            {child}
        </div>
    );
};

export default CellListItem;
