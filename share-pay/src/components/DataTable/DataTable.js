import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination';

import './DataTable.css';

const DataTable = ({ Caption, Header, Data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataRows, setDataRows] = useState([]);
    const [dataOrg, setDataOrg] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [dtFilters, setDtFilters] = useState([]);

    const rowPerPage = 5;
    // setCurrentRows(Data)
    const totalRows = dataRows.length;
    const numberOfRows = Math.round(Math.ceil(totalRows / rowPerPage));
    const indexOfLastRow = currentPage * rowPerPage;
    const indexOfFirstrow = indexOfLastRow - rowPerPage;
    const currentRows = dataRows.slice(indexOfFirstrow, indexOfLastRow);

    const startSl = ((currentPage * rowPerPage) - rowPerPage) + 1

    useEffect(() => {
        // console.log('[DataTable]-useEffect',Data)
        setCurrentPage(1)
        setDataOrg(Data);
        setDataRows(Data);
        const filterKeys = [];

        Header.forEach(row => {
            if (row.isFilter) {
                filterKeys.push(row.key)
            }
        });
        setDtFilters(filterKeys);

    }, [Data,Header]);

    const paginate = (number) => {
        setCurrentPage(number)
    }

    const handleSearch = (query) => {
        setSearchText(query);
        setCurrentPage(1);

        let filteredData = [];
        if (query.length > 0) {
            filteredData = dataRows.filter(row => {
                let isValid = false;
                dtFilters.forEach(fKey => {
                   isValid = row[fKey].toLowerCase().search(query.toLowerCase()) !== -1 || isValid;
                })
                console.log(isValid)
                return isValid;
            })           
        }
        else{
            filteredData = dataOrg;            
        }
        setDataRows(filteredData);
        
    }
    // console.log(currentRows.length)
    if(currentRows.length<=0){
        // console.log(currentRows)
        // return null;
    }
    return (
        <div className="dt-wrap">
            {
                Caption &&
                <div className="dt-title">{Caption}</div>
            }
            <div className="dt-search">
                <div className="input-group pull-right">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupPrepend">
                            <span className="fa fa-search"></span>
                        </span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        autoComplete="off" />
                </div>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        {
                            Header.map((hRow, index) => (
                                <th key={`dt-th-${hRow.key}-${index}`} scope="col">{hRow.Header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        currentRows.map((dRow, index) => (
                            <tr key={`dt-drow-${dRow.id}`}>
                                <th scope="row">{startSl + index}</th>
                                {
                                    Header.map((hRow, index) => {
                                        if (hRow.cell) {
                                            return <td key={`dt-drow-${dRow.id}-${hRow.key}`}>{hRow.cell(dRow[hRow.key])}</td>
                                        }
                                        else {
                                            return <td key={`dt-drow-${dRow.id}-${hRow.key}`}>{dRow[hRow.key]}</td>
                                        }
                                    })
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <span>Total {totalRows} rows </span>
            <Pagination
                currentPage={currentPage}
                numberOfRows={numberOfRows}
                rowPerPage={rowPerPage}
                totalRows={totalRows}
                paginate={paginate} />

        </div>
    );
}
export default DataTable;