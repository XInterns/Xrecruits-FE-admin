import React from 'react';

const Delete = (props) => {
    return (
        <h1>Delete</h1>
        // <li className="tab-link">
        //     <a className={`tab-link ${props.linkClassName} ${props.isActive ? 'active' : ''}`}
        //         onClick={(event) => {
        //             event.preventDefault();
        //             props.onClick(props.tabIndex);
        //         }}>
        //         <i>{props.iconClassName}</i>
        //     </a>
        // </li>
    )
}

// Tab.propTypes = {
//     onClick      : PropTypes.func,
//     tabIndex     : PropTypes.number,
//     isActive     : PropTypes.bool,
//     iconClassName: PropTypes.string.isRequired,
//     linkClassName: PropTypes.string.isRequired
// };

export default Delete;