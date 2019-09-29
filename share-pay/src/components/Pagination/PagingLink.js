import React from 'react';

const PagingLink = ({ plKey,plFunc,plVal,plActiveClass,children}) => {
    
    return(
        <li key={ `pl-${plKey}` } className={`page-item ${plActiveClass ? 'active' : ''}`}>
            <span onClick={() => plFunc(plVal) } className="page-link">
                { children }
            </span>
        </li>
    );    
};
export default PagingLink;