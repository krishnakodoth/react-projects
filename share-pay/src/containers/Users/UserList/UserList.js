import React, { Fragment } from 'react';
import DataTable from '../../../components/DataTable/DataTable';
const userList = (props) => (
    <Fragment>
        <DataTable
            Caption='User List'
            Header={props.tableHeader}
            Data={props.userList} />
    </Fragment>
);
export default userList;