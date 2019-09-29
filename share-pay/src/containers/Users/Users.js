import React, { Component, Fragment } from 'react';
import { userService } from '../../services/users.services';
import UserList from './UserList/UserList';
import AddNewUser from './AddNewUser';
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import Spinner from '../../components/UI/Spinner/Spinner';

import Firbase from '../../utils/Firebase';
// import FirbaseAdm from '../../utils/Firebase-admin';

class Users extends Component {
    state = {
        userList: {},
        modalNewUserOpen: false,
        deleteModalOpen: false,
        deleteModalLoad:false,
        userDeleteId: ''
    }
    componentDidMount() {
        this.getUsers();        
    }
    getUsers = () =>{
        userService.getUsers().then(response => {
            this.setState({
                userList: response
            })
        });
    }
    addUserModalHandler = () => {
        this.setState({
            modalNewUserOpen: true
        })
    }
    dismissNewUserModal = () => {
         this.setState({
            modalNewUserOpen: false
        })
    }

    addUserHandler = (formData) => {
        /* FirbaseAdm.auth().createUser({
            email: 'user@example.com',
            emailVerified: false,
            phoneNumber: '+11234567890',
            password: 'secretPassword',
            displayName: 'John Doe',
            photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false
          })
            .then(function(userRecord) {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully created new user:', userRecord.uid);
            })
            .catch(function(error) {
              console.log('Error creating new user:', error);
            }); */
          
          
        return;
        userService.addUser(formData)
            .then(result => {
                const alertType = (result.status===200) ? 'success':'danger';
                const alertMessage = (result.status===200)?'User has been added successfully !':'Something went wrong !';
                this.setState({
                    isAlert:true,
                    alertType:alertType,
                    alertMessage:alertMessage,
                    modalNewUserOpen:false
                });
                this.getUsers(); 
                Firbase.auth().createUserWithEmailAndPassword(formData.email,formData.password).then((u)=>{
                    console.log(u)
                    Firbase.auth().sendPasswordResetEmail(formData.email).then(function(data) {
                        console.log(data)
                        // Email sent.
                        this.setState({
                            isAlert:true,
                            alertType:alertType,
                            alertMessage:alertMessage,
                            modalNewUserOpen:false
                        });
                      }).catch(function(error) {
                        // An error happened.
                      });
                      
                }).catch(error=>{
                    //console.log(error)
                    this.setState({
                        isAlert:true,
                        alertType:'danger',
                        alertMessage:error.message,
                        modalNewUserOpen:false
                    });
                });
                
            });
    }

    setDeleteUserId = (user_id) => {
        this.setState({
            deleteModalOpen: true,
            userDeleteId: user_id
        })
    }
    dismissDeleteModal = () => {
        this.setState({
            deleteModalOpen: false,
        })
    }
    onDeleteUserHandler = () =>{
        /* console.log(Firbase.auth().currentUser);
        return; */
        this.setState({
            deleteModalLoad: true,
        })
        const deleteUser = this.state.userDeleteId;
        userService.deleteUser(deleteUser)
            .then(result => {
                const alertType = (result.status === 200) ? 'success':'danger';
                const alertMessage = (result.status === 200) ? 'User has been deleted successfully !':'Something went wrong !';  
                this.setState({
                    isAlert:true,
                    alertType:alertType,
                    alertMessage:alertMessage,
                    deleteModalOpen: false,
                    deleteModalLoad:false
                });
                this.getUsers(); 
            });
    }

    tableHeader = [{
        Header: 'Name',
        key: 'name',
        isFilter: true,
    },
    {
        Header: 'Email',
        key: 'email',
        isFilter: true,
    }, {
        Header: 'Mobile',
        key: 'mobile',
        isFilter: true,
    },
    {
        Header: 'Password',
        key: 'password',
        isFilter: false,
    }, {
        Header: 'Action',
        key: 'id',
        cell: (value) => (<button className="btn btn-danger" onClick={() => this.setDeleteUserId(value)}><i className="fa fa-trash"></i></button>)
    }];

    render() {
        
        let delConfirm = this.state.deleteModalLoad ? <Spinner /> : 'Do you want to delete selected User ?';


        return (
            <Fragment>
                {
                    this.state.isAlert &&                    
                    <Alert alertType={ this.state.alertType } alertMessage={ this.state.alertMessage } />
                }
                {
                    this.state.modalNewUserOpen &&
                    <AddNewUser
                        dismissModal={this.dismissNewUserModal}
                        onAddNewUser={this.addUserHandler} />
                }
                {
                    this.state.deleteModalOpen &&
                    <Modal
                        title="Confirm Delete"
                        onDismiss={this.dismissDeleteModal}
                        onSubmit={this.onDeleteUserHandler}
                        submitButtonText = {'DELETE PLAYER'}
                        isSubmittable = { true }
                        >
                        <div className="card">
                            <div className="card-body">
                                { delConfirm }
                            </div>
                        </div>
                    </Modal>
                }
                <div className="actions">
                    <div className="pull-right">
                        <button
                            className="btn btn-primary"
                            onClick={this.addUserModalHandler}>
                            <i className="fa fa-plus-circle"></i> Add New Player
                        </button>
                    </div>
                </div>
                <UserList
                    tableHeader={this.tableHeader}
                    userList={this.state.userList} />
            </Fragment>
        )
    }
}
export default Users;