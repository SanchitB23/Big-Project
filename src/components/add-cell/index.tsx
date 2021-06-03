import React from 'react';
import './add-cell.css'
import {useActions} from "../../hooks/useActions";

interface AddCellProps {
    previousCellID: string | null;
    forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({previousCellID, forceVisible}) => {
    const {insertCellAfter} = useActions();
    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className="add-buttons">
                <button className="button is-rounded is-primary is-small" onClick={() => {
                    insertCellAfter(previousCellID, 'code')
                }}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"/>
                    </span>
                    <span>Code</span>
                </button>
                <button className="button is-rounded is-primary is-small" onClick={() => {
                    insertCellAfter(previousCellID, 'markdown')
                }}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"/>
                    </span>
                    <span>Markdown</span>
                </button>
            </div>
            <div className="divider"/>
        </div>
    );
};

export default AddCell;
