import React, { Component } from 'react';
import NavBar from '../../_components/NavBar';
import Footer from '../../_components/Footer';
import { userService } from '../../services/users.services';
import Alert from '../../components/Alert';
import MatchList from './MatchList';
import './Match.css';

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            match_list: [],
            isAlert: false,
            alertType: '',
            alertMessage: ''
        };
    }
    componentDidMount() {
        this.getMatch();
        this.getPlayers();
    }
    getMatch = () => {
        return userService.getMatches().then(matchList =>{
            return this.setState({ match_list: matchList });
            }
        );
    }
    getPlayers = () => {
        return userService.getPlayers().then(playerList =>{
            return this.setState({ player_list: playerList });
            }
        );
    }

    addMatchHandler = (formData) => {
        let matchPlayers = [...formData.players];
        let matchAmount = parseFloat(formData.amount);
        let amountPerPerson = Math.round(matchAmount / matchPlayers.length);
        
        let allPlayers = [...this.state.player_list];
        let updatedPlayers = [];
        allPlayers.forEach((row)=>{
            if(matchPlayers.includes(row.id)){
                updatedPlayers.push({
                    id:row.id,
                    balance:parseFloat(row.balance) - amountPerPerson
                });
            }
        })

        return userService.addMatch(formData)
            .then(result => {
                // Update player balance
                updatedPlayers.forEach(row=>{
                    userService.updatePlayerBalance(row.id,row.balance);
                });
                const alertType = (result.status===200)?'success':'danger';
                const alertMessage = (result.status===200)?'Match has been added successfully !':'Somthing went wrong';
                this.setState({
                    isAlert:true,
                    alertType:alertType,
                    alertMessage:alertMessage
                });
                if(result.status === 200)
                    this.getMatch();
                return;
            });
    }

    deleteMatchHandler = (deleteId) => {
        userService.deleteMatch(deleteId)
            .then(result => {
                const alertType = (result.status===200)?'success':'danger';
                const alertMessage = (result.status===200)?'Match has been deleted successfully !':'Somthing went wrong';
                this.setState({
                    isAlert:true,
                    alertType:alertType,
                    alertMessage:alertMessage
                });
                if(result.status)
                    this.getMatch();
                return;
            });
    }

    render() {
        //const match_list = this.state.match_list;

        return (
            <React.Fragment>
            {
                this.state.isAlert &&
                <Alert alertType={this.state.alertType} alertMessage={this.state.alertMessage} />
            }
            <MatchList 
                MatchList={this.state.match_list} 
                onAddMatch={ this.addMatchHandler }
                onDeleteMatch={this.deleteMatchHandler}
                />
            </React.Fragment>
        );
    }
}

export default Match;