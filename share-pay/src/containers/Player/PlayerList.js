import React, { Component } from 'react';
import DataTable from '../../components/DataTable/DataTable';
import Modal from '../../components/Modal';
import AddNewPlayer from './AddNewPlayer';
import { userService } from '../../services/users.services';

class PlayerList extends Component {
    constructor(props) {
        super(props);
        console.log('[PlayerList.js] - constructor', this.props.PlayerList)
        this.state = {            
            modalOpen: false,
            deleteModalOpen: false,
            playerDeleteId: '',
            isAdmin : false,
            userList:[]
        }
    }

    componentDidMount() {
        // console.log('[PlayerList.js] - componentDidMount', this.props.PlayerList)
        /* this.setState({
            playerList:this.props.PlayerList
        }) */
        // this.getUsers();
    }
    /* getUsers = () => {
        userService.getUsers().then(users => {
            this.setState({ userList: users })
        }).catch(_ => {});
    } */

    dismissPlayerModal = () => {
        // setPlayerNameValid(true);
        this.setState({ modalOpen: false })
    };

    addPlayerHandler = () => {
        // console.log('addPlayerHandler')
        this.setState({ modalOpen: true })
    }
    
    updateBalanceModalHandler = (player_id) => {
        console.log(player_id)
    }
    deleteModalHandler = (player_id) => {
        this.setState({
            deleteModalOpen: true,
            playerDeleteId: player_id
        })
    }

    dismissDeleteModal = () => {
        this.setState({
            deleteModalOpen: false,
            playerDeleteId: 0
        })
    }

    onDeletePlayerHandler = () => {
        this.props.onDeletePlayer(this.state.playerDeleteId);
        this.dismissDeleteModal()
    }

    submitForm = (formData) => {
        this.props.onAddPlayer(formData).then(result=>{if(result){ this.dismissPlayerModal() }});
    }

    
    render() {
        const tableHeader = [{
            Header: 'Name',
            key: 'name',
            isFilter: true,
        },
        {
            Header: 'Email',
            key: 'email',
            isFilter: true,
        },
        {
            Header: 'Mobile',
            key: 'mobile',
            isFilter: true,
        },
        {
            Header: 'Balance',
            key: 'balance',
            isFilter: false,
            cell: (value) => (<span className={`td-amount ${value < 0 ? 'low' : ''} `} >{value}</span>)
        }];
        //if(this.props.adminUsers.includes(this.props.currentUser)){
        if(this.props.currentUser.isAdmin){
            tableHeader.push({
                Header: 'Actions',
                key: 'id',
                cell: (value) => (
                    <div className="dt-col-action">
                    <button 
                        className="btn-floating btn-sm btn-primary waves-effect waves-light" 
                        onClick={() => this.updateBalanceModalHandler(value)}>
                        <i className="fa fa-edit"></i>
                    </button>
                    <button 
                        className="btn-floating btn-sm btn-danger waves-effect waves-light"
                        test={this.props.currentUserId} 
                        disabled={this.props.currentUserId === value}
                        onClick={() => this.deleteModalHandler(value)}
                        title={'Delete Player'}>
                        <i className="fa fa-trash"></i>
                    </button>
                    </div>                 
                    )
            });

        }

        console.log('PlayerList.js :: props',this.props.adminUsers)

        return (
            <div>
                {
                    this.state.modalOpen &&
                    <AddNewPlayer
                        dismissModal={ this.dismissPlayerModal }
                        onAddNewPlayer = { this.submitForm } 
                        />
                }

                {
                    this.state.deleteModalOpen &&
                    <Modal
                        title="Confirm Delete"
                        onDismiss={this.dismissDeleteModal}
                        onSubmit={this.onDeletePlayerHandler}
                        submitButtonText = {'DELETE PLAYER'}
                        isSubmittable = { true }
                        >
                        <div className="card">
                            <div className="card-body">
                                Do you want to delete selected player ?
                            </div>
                        </div>
                    </Modal>
                }
                <div className="actions">
                    {
                        //(this.props.adminUsers.includes(this.props.currentUser)) &&
                        this.props.currentUser.isAdmin &&
                        <div className="pull-right">
                            <button
                                className="btn btn-primary"
                                onClick={this.addPlayerHandler}>
                                <i className="fa fa-plus-circle"></i> Add New Player
                            </button>
                        </div>                    
                    }
                </div>
                {
                    this.props.PlayerList &&
                    <DataTable
                        Caption='Player List'
                        Header={tableHeader}
                        Data={this.props.PlayerList} />
                }
                

            </div>
        )
    }
}
/* 

const PlayerList = ({ PlayerList, onDeletePlayer,onAddPlayer }) => {

    const [modalOpen,setModalOpen] = useState(false); 
    const [deleteModalOpen,setDeleteModalOpen] = useState(false); 
    const [playerName,setPlayerName] = useState('');
    const [playerNameValid,setPlayerNameValid] = useState(true);
    const [playerEmail,setPlayerEmail] = useState('');
    const [playerEmailValid,setPlayerEmailValid] = useState(true);
    const [playerAmount,setPlayerAmount] = useState('');
    const [playerAmountValid,setPlayerAmountValid] = useState(true);

    const [playerDeleteId,setPlayerDeleteId] = useState(0);

    

    
    return (
        <div>  
            
            {
                deleteModalOpen &&
                <Modal 
                    title="Confirm Delete"
                    onDismiss={ () => dismissDeleteModal() }
                    onSubmit={ () => onDeletePlayerHandler() }>
                </Modal>
            }
            <div className="actions">
                <div className="pull-right">
                    <button 
                        className="btn btn-primary"
                        onClick={ () => addPlayerHandler() }>
                        <i className="fa fa-plus-circle"></i> Add New Player
                    </button>
                </div>
            </div>
            <DataTable
                Caption='Player List'
                Header={tableHeader}
                Data={PlayerList} />
        </div>

    );
} */
export default PlayerList;