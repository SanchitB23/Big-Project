import React from 'react';
import {useActions} from "../../hooks/useActions";
import ActionButton from "../../container/action-button";
import './action-bar.css'
import {CellDirection} from "../../constants/cell-types";

interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
    const {moveCell, deleteCell} = useActions();

    return (
        <div className="action-bar">
            <ActionButton onClick={() => moveCell(id, CellDirection.UP)} iconStyle="fa-arrow-up"/>
            <ActionButton onClick={() => moveCell(id, CellDirection.DOWN)} iconStyle="fa-arrow-down"/>
            <ActionButton onClick={() => deleteCell(id)} iconStyle="fa-times"/>
        </div>
    );
};

export default ActionBar
