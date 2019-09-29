import React, { Component } from 'react';

import NavBar from '../../_components/NavBar';
import Footer from '../../_components/Footer';

import PlayerList from './PlayerList';

import { userService } from '../../_services/user.service';
import Alert from '../../_components/Alert';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            isAlert : false,
            alertType : '',
            alertMessage:''
        };

        this.deletePlayerHandler = this.deletePlayerHandler.bind(this);
    }
    componentDidMount() {
       this.getPlayers();
    }

    getPlayers = () =>{
        userService.getPlayers().then(players => this.setState({ players: players.data }));
    }

    deletePlayerHandler = (deleteId) => {
        userService.deletePlayer(deleteId)
            .then(result => {
                const data = result.data;
                const alertType = (data.status) ? 'success':'danger';
                const alertMessage = data.message;                
                this.setState({
                    isAlert:true,
                    alertType:alertType,
                    alertMessage:alertMessage
                });
                if(data.status)
                    this.getPlayers();
            });
    }
    

    addPlayerHandler = (formData) => {
        return userService.addPlayer(formData)
            .then(result => {
                const data = result.data;
                const alertType = (data.status) ? 'success':'danger';
                const alertMessage = data.message;                
                this.setState({
                    isAlert:true,
                    alertType:alertType,
                    alertMessage:alertMessage
                });
                if(data.status)
                    this.getPlayers();
                return true;
            });
    }
    render() {
        // const { players } = this.state;
        return (
            <React.Fragment>
                <NavBar />
                <div className="app-content box">
                    {
                        this.state.isAlert &&
                        <Alert alertType={ this.state.alertType } alertMessage={ this.state.alertMessage } />
                    }                    
                    <PlayerList PlayerList={this.state.players} onDeletePlayer={this.deletePlayerHandler} onAddPlayer={ this.addPlayerHandler } />
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Player;