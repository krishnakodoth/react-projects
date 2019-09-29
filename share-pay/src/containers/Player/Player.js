import React, { Component } from 'react';

import { connect } from 'react-redux';

import { setCurrentUserId,loadPlayerList,addAdminList } from './actions';

// import { makeSelectPlayeList } from './'
import PlayerList from './PlayerList';

import { userService } from '../../services/users.services';
import Alert from '../../components/Alert';
import Spinner from '../../components/UI/Spinner/Spinner';


class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            isAlert: false,
            alertType: '',
            alertMessage: '',
            adminUsers:[],
            currentUser:null,
            currentUserId:null
        };
       
        this.deletePlayerHandler = this.deletePlayerHandler.bind(this);

    }
   

    componentDidMount() {
        const currentUser = userService.getUserProfile();
        if(currentUser){
            this.setState({
                currentUser:currentUser.email                
            })
        }
        this.getPlayers();
    }

    getPlayers = () => {
        if(!this.props.playerList){
            const currentUser = this.props.currentUser;//userService.getUserProfile();
            console.log(currentUser)
            userService.getPlayers().then(players => {
                const adminUsers = [];
                players.forEach(row=>{
                    if(parseInt(row.isAdmin) === 1){
                        adminUsers.push(row.email);
                    }
                    if(row.email === currentUser.email){
                        this.props.onSetCurrentUserId(row.id);
                       //  this.setState({ currentUserId:row.id });
                    }
                });

                this.props.onLoadPlayerList(players);
                this.props.onAddAdminList(adminUsers);

                // this.setState({ players: players,adminUsers:adminUsers });
            }).catch(error => {
                this.setState({
                    isAlert: true,
                    alertType: 'danger',
                    alertMessage: error.toString()
                });
            });
        }        
    }

   
    deletePlayerHandler = (deleteId) => {
        userService.deletePlayer(deleteId)
            .then(result => {
                const alertType = (result.status===200)?'success':'danger';
                const alertMessage = (result.status===200)?'Player has been deleted successfully !':'Somthing went wrong';
                this.setState({
                    isAlert: true,
                    alertType: alertType,
                    alertMessage: alertMessage
                });
                if (result.status===200)
                    this.getPlayers();
                return true;
            });
    }


    addPlayerHandler = (formData) => {
        return userService.addPlayer(formData)
            .then(result => {
                /* if(result.status===200){
                    let actionCodeSettings = {
                        url: 'http://localhost:3000/',
                        handleCodeInApp: true,
                      };                      
                      Firebase.auth().sendSignInLinkToEmail(formData.email, actionCodeSettings).then(()=>{})
                      .catch((error) =>{console.log(error)});
                } */
                const alertType = (result.status===200)?'success':'danger';
                const alertMessage = (result.status===200)?'Player has been added successfully !':'Somthing went wrong';
                this.setState({
                    isAlert: true,
                    alertType: alertType,
                    alertMessage: alertMessage
                });
                if (result.status===200)
                    this.getPlayers();
                return true;
            });
    }
    render() {
        // const { players } = this.state;
        // console.log('[Player.js]-render',this.state.players)
       /*  console.log('currentUser',this.state.currentUser)
        console.log('adminUsers',this.state.adminUsers) */

        console.log('adminList change :',this.props.adminList)

        return (
            <React.Fragment>
                {
                    this.state.isAlert &&
                    <Alert alertType={this.state.alertType} alertMessage={this.state.alertMessage} />
                }
                {
                    this.props.adminList ?
                    <PlayerList 
                        PlayerList={this.props.playerList} 
                        onDeletePlayer={this.deletePlayerHandler} 
                        onAddPlayer={this.addPlayerHandler}
                        currentUser={this.props.currentUser}
                        adminUsers = {this.props.adminList}
                        currentUserId = {this.props.currentUserId}
                        />
                        :
                        <Spinner />

                }
                
            </React.Fragment>
        )
    }
}

/* const mapStateToProps = createStructuredSelector({
    playerList: makeSelectPlayeList(),
  }); */

  const mapStateToProps = (state) => ({
    currentUser: state.global.currentUser,
    currentUserId : state.global.currentUserId,
    playerList: (state.global.playerList)?state.global.playerList:null,
    adminList: state.global.adminList
  });

  const mapDispatchToProps = (dispatch) => ({
    onSetCurrentUserId: (userId) => dispatch(setCurrentUserId(userId)),    
    onLoadPlayerList: (playerList) => dispatch(loadPlayerList(playerList)),
    onAddAdminList: (adminList) => dispatch(addAdminList(adminList)),
  });

/*   const mapDispatchToProps = (dispatch) => ({
    onLogoutUser: () => dispatch(logoutUser()),
   
  }); */
  export default connect(mapStateToProps,mapDispatchToProps)(Player);
// export default Player;