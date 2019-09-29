import React from 'react';
import PagingLink from './PagingLink';
const Pagination = ({ rowPerPage, totalRows, currentPage, paginate, numberOfRows }) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRows / rowPerPage); i++) {
        pageNumbers.push(i);
    }

    const pageNumbers1 = pageNumbers.slice(0,4);
    const pageNumbers2 = pageNumbers.slice(4);
    const P1 =  pageNumbers1.map(number => {
        if (number === 1 || number === totalRows || (number >= currentPage - 2 && number <= currentPage + 2)) {
            return( 
            <PagingLink key={ `plM-${number}` }
                plKey = { number }
                plVal = { number }
                plFunc = { paginate }
                plActiveClass = { currentPage === number ? 'active' : '' } 
                >
                {number}
            </PagingLink>
            );
        }
        return null;
    });


    const P2 =  pageNumbers2.map(number => {
        if (number === 1 || number === totalRows || (number >= currentPage - 2 && number <= currentPage + 2)) {
            return(
                <PagingLink key={ `plM-${number}` }
                    plKey = { number }
                    plVal = { number }
                    plFunc = { paginate }
                    plActiveClass = { currentPage === number ? 'active' : '' } 
                    >
                    {number}
                </PagingLink>
            );           
        }
        return null;
    })
    if(totalRows <= rowPerPage){
        return null;
    }
    return (
        <nav className="dt-pagination">
            <ul className="pagination">
                {
                    currentPage !== 1 &&
                    <PagingLink
                        plKey="first"
                        plVal = { 1 }
                        plFunc = { paginate }
                        >
                        <i className="fa fa-angle-double-left"></i>&nbsp; First
                    </PagingLink>
                }
                {
                    currentPage > 1 &&
                    <PagingLink
                        plKey="prev"
                        plVal = { currentPage - 1 }
                        plFunc = { paginate }
                        >
                        <i className="fa fa-angle-left"></i>&nbsp; Prev
                    </PagingLink>
                }
                { P1 }
                <li className="page-item"><span className="page-link"> ... </span></li>
                { P2 }
                {
                    currentPage !== numberOfRows &&
                    <PagingLink
                        plKey="next"
                        plVal = { currentPage + 1 }
                        plFunc = { paginate }
                        >
                        <i className="fa fa-angle-right"></i>&nbsp; Next
                    </PagingLink>
                }                
                {
                    currentPage !== numberOfRows &&
                    <PagingLink
                        plKey="next"
                        plVal = { numberOfRows }
                        plFunc = { paginate }
                        >
                        <i className="fa fa-angle-double-right"></i>&nbsp; Last
                    </PagingLink>
                }
            </ul>
        </nav>
    );
};
export default Pagination;