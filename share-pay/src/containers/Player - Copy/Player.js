import React, { Component } from 'react';

import NavBar from '../../_components/NavBar';
import Footer from '../../_components/Footer';

import PlayerList from './PlayerList';

import { userService } from '../../services/users.services';

import Alert from '../../_components/Alert';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            users:[],
            isAlert: false,
            alertType: '',
            alertMessage: ''
        };

        this.deletePlayerHandler = this.deletePlayerHandler.bind(this);
    }
    componentDidMount() {
        console.log('[Player.js] - componentDidMount')
        this.getPlayers();
    }

    getPlayers = () => {
        userService.getPlayers().then(players => {
            this.setState({ players: players })
        }).catch(error => {
            this.setState({
                isAlert: true,
                alertType: 'danger',
                alertMessage: error.toString()
            });
        });
    }

   
    deletePlayerHandler = (deleteId) => {
        userService.deletePlayer(deleteId)
            .then(result => {
                const data = result.data;
                const alertType = (data.status) ? 'success' : 'danger';
                const alertMessage = data.message;
                this.setState({
                    isAlert: true,
                    alertType: alertType,
                    alertMessage: alertMessage
                });
                if (data.status)
                    this.getPlayers();
            });
    }


    addPlayerHandler = (formData) => {
        return userService.addPlayer(formData)
            .then(result => {
                const data = result.data;
                const alertType = (data.status) ? 'success' : 'danger';
                const alertMessage = data.message;
                this.setState({
                    isAlert: true,
                    alertType: alertType,
                    alertMessage: alertMessage
                });
                if (data.status)
                    this.getPlayers();
                return true;
            });
    }
    render() {
        // const { players } = this.state;
        // console.log('[Player.js]-render',this.state.players)
        return (
            <React.Fragment>
                {
                    this.state.isAlert &&
                    <Alert alertType={this.state.alertType} alertMessage={this.state.alertMessage} />
                }
                <PlayerList 
                    PlayerList={this.state.players} 
                    onDeletePlayer={this.deletePlayerHandler} 
                    onAddPlayer={this.addPlayerHandler} />

            </React.Fragment>
        )
    }
}

export default Player;