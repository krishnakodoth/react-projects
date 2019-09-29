import React,{ useState } from 'react';
import DataTable from '../../_components/DataTable/DataTable';
import Modal from '../../_components/Modal';

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

    const tableHeader = [{
        Header: 'Name',
        key: 'name',
        isFilter: true,
    },
    {
        Header: 'Email',
        key: 'email',
        isFilter: true,
    }, {
        Header: 'Balance',
        key: 'balance',
        isFilter: false,
        cell: (value) => (<span className={`td-amount ${value < 0 ? 'low' : ''} `} >{value}</span>)
    }, {
        Header: 'Action',
        key: 'id',
        cell: (value) => (<button className="btn btn-danger" onClick={() => deleteModalHandler(value)}><i className="fa fa-trash"></i></button>)
    }]

    const addPlayerHandler = () => {
        console.log('addPlayerHandler')
        setModalOpen(true)
    }
    const dismissPlayerModal = () =>{
        setPlayerNameValid(true);
        setModalOpen(false)
    }
    const deleteModalHandler = (player_id) => {
        setDeleteModalOpen(true);
        setPlayerDeleteId(player_id)
    }
    const dismissDeleteModal = () =>{
        setDeleteModalOpen(false)
    }
    const onDeletePlayerHandler = () => {
        onDeletePlayer(playerDeleteId);
        dismissDeleteModal()
    }
    const submitForm = () => {
        let isValid = true;
        let alphaRegx = /^[a-zA-Z/\s]+$/;
        if(playerName === "" || !alphaRegx.test(playerName)){
            isValid = false;
            setPlayerNameValid(false);
        }
        let emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(playerEmail === "" || !emailRegx.test(playerEmail)){
            isValid = false;
            setPlayerEmailValid(false);
        }

        let amountRegx = /^\d+$/;
        if(playerAmount === "" || !amountRegx.test(playerAmount)){
            isValid = false;
            setPlayerAmountValid(false);
        }
        if(isValid){
            const formData = {
                playerName,
                playerEmail,
                playerAmount
            };
            // console.log('valid form ',formData);
            onAddPlayer(formData).then(result=>{if(result){ dismissPlayerModal() }});
        }
        
         
    }
    return (
        <div>  
            {
                modalOpen &&
                <Modal 
                    title="Add New Player"
                    onDismiss={ () => dismissPlayerModal() }
                    onSubmit={ () => submitForm() }>
                    <form>
                        <div className="card">
                            <div className="card-body">
                                <div className={`form-group ${!playerNameValid ? 'has-error':''}`}>
                                    <label>Player Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Enter Name"
                                        name="playerName"
                                        value = { playerName }
                                        onChange = { (e)=> { setPlayerName(e.target.value);setPlayerNameValid(true); } } />
                                    <div className="invalid-feedback">
                                       Please enter valid Name.
                                    </div>
                                    
                                </div>
                                <div className={`form-group ${!playerEmailValid ? 'has-error':''}`}>
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="Enter email"
                                        value = { playerEmail }
                                        onChange = { (e)=> { setPlayerEmail(e.target.value);setPlayerEmailValid(true); } }  />
                                    <div className="invalid-feedback">
                                       Please enter valid email.
                                    </div>
                                    
                                </div>
                                <div className={`form-group ${!playerAmountValid ? 'has-error':''}`}>
                                    <label>Advance Amount</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Enter Amount"
                                        value = { playerAmount }
                                        onChange = { (e)=> { setPlayerAmount(e.target.value);setPlayerAmountValid(true) } } />
                                    <div className="invalid-feedback">
                                        Please enter valid amount.
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </form>
                </Modal>
            }
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
}
export default PlayerList;