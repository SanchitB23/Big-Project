import React from 'react';
import {useTypedSelector} from "../../hooks/use-typed-selector"
import CellListItem from "./cell-list-item";


const CellList: React.FC = () => {
    const cells = useTypedSelector(({cells}) => cells?.order.map((id) => cells?.data[id]))

    const renderedCells = cells?.map((cell) => <CellListItem cell={cell} key={cell.id}/>)

    return (
        <div>
            {renderedCells}
        </div>
    );
};

export default CellList;
