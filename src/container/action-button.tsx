import React from 'react';

interface ActionButtonProps {
    onClick: () => {},
    iconStyle: string
}

const ActionButton: React.FC<ActionButtonProps> = ({onClick, iconStyle}) => {
    return (
        <button onClick={onClick} className="button is-primary is-small">
                <span className="icon">
                    <i className={`fas ${iconStyle}`}/>
                </span>
        </button>
    );
};

export default ActionButton;
