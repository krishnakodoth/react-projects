import React, { Component } from 'react';
import DataTable from '../../components/DataTable/DataTable';
import AddNewMatch from './AddNewMatch';
import Modal from '../../components/Modal';
import { userService } from '../../services/users.services';


class MatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            deleteModalOpen: false,
            playerDeleteId: '',
            userList: []
        }

    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        userService.getPlayers().then(users => {
            this.setState({ userList: users })
        }).catch(_ => { });
    }
    getUserName = (userId) => {
        const userList = { ...this.state.userList };
        const filterUserList = [];
        
        for (let uKey in userList) {
            filterUserList.push({
                id: userList[uKey].id,
                name: userList[uKey].name
            })            
        }
        let cUser = '';
        filterUserList.map((row)=>{
           if(row.id === userId){
                cUser = row.name;
           }
        });
        return cUser;
    }

    tableHeader = [{
        Header: 'Date',
        key: 'date',
        isFilter: false,
    },
    {
        Header: 'Venue',
        key: 'venue',
        isFilter: true,
    },
    {
        Header: 'Players',
        key: 'players',
        isFilter: false,
        cell: (value) => {
            let players = value;
            return <div className="sp-ml-td-players">
                {
                    players.map((userId, key) => (
                        <span key={`sp-mp-${key}-${userId}`} className={`sp-m-players`} >{this.getUserName(userId)}</span>
                    ))
                }
            </div>
        }
    },

    {
        Header: 'Match Amount',
        key: 'amount',
        isFilter: false,
        cell: (value) => (<span className={`td-amount`} >{value}</span>)
    }, {
        Header: 'Action',
        key: 'id',
        cell: (value) => (<button className="btn btn-danger" onClick={() => this.deleteModalHandler(value)}><i className="fa fa-trash"></i></button>)
    }];

    addMatchHandler = () => {
        // console.log('addPlayerHandler')
        this.setState({ modalOpen: true })
    }
    dismissMatchModal = () => {
        // setPlayerNameValid(true);
        this.setState({ modalOpen: false })
    };

    deleteModalHandler = (match_id) => {
        this.setState({
            deleteModalOpen: true,
            matchDeleteId: match_id
        })
    }
    dismissDeleteModal = () => {
        this.setState({
            deleteModalOpen: false,
            matchDeleteId: 0
        })
    }

    onDeleteMatchHandler = () => {
        this.props.onDeleteMatch(this.state.matchDeleteId);
        this.dismissDeleteModal()
    }


    submitForm = (formData) => {
        this.props.onAddMatch(formData).then(_ => this.dismissMatchModal());
    }

    render() {
        return (
            <div>
                {
                    this.state.modalOpen &&
                    <AddNewMatch
                        dismissModal={this.dismissMatchModal}
                        onAddNewMatch={this.submitForm}
                        userList={this.state.userList} />
                }
                {
                    this.state.deleteModalOpen &&
                    <Modal
                        title="Confirm Delete"
                        onDismiss={this.dismissDeleteModal}
                        onSubmit={this.onDeleteMatchHandler}
                        submitButtonText={'DELETE MATCH'}
                        isSubmittable={true}
                    >
                        <div className="card">
                            <div className="card-body">
                                Do you want to delete selected Match ?
                            </div>
                        </div>
                    </Modal>
                }
                <div className="actions">
                    <div className="pull-right">
                        <button
                            className="btn btn-primary"
                            onClick={this.addMatchHandler}>
                            <i className="fa fa-plus-circle"></i> Add New Match
                        </button>
                    </div>
                </div>
                <DataTable
                    Caption='Match List'
                    Header={this.tableHeader}
                    Data={this.props.MatchList} />
            </div>
        );
    }
}

export default MatchList;