import decode from 'jwt-decode';
import axios from '../utils/axios.config';

import Firebase from '../utils/Firebase';

export const userService = {
    login,
    logout,
    loggedIn,
    getUserProfile,
    addAllowedUser,
    getValidUser,
    // addUser,
    // getUsers,
    // deleteUser,
    getPlayers,
    addPlayer,
    deletePlayer,
    updatePlayerBalance,
    getMatches,
    addMatch,
    deleteMatch
};

function login(username, password) {
    return Firebase.auth().signInWithEmailAndPassword(username,password).then((user)=>{
        return user;
    }).catch(error=>{
        return error;
    });
}


function loggedIn() {
    // Checks if there is a saved token and it's still valid
    // const token = getToken() // GEtting token from localstorage
    //  console.log(token)
    // return !!token && !isTokenExpired(token) // handwaiving here
}
function logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('app_sp_token');

    Firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
}
function getUserProfile(){    
    var user = Firebase.auth().currentUser;
    return user;
}
/* function getUsers() {
    // https://share-pay-61301.firebaseio.com/
    return axios.get('/users.json')
        .then(response => {
            const spUsers = [];
            const userList = {...response.data};
            if (userList) {
                for (let key in userList) {
                    userList[key]['id'] = key;
                    spUsers.push(userList[key]);
                }
            }
            return spUsers;
        })
        .catch(error => {
            return error;
        });
    // List batch of users, 1000 at a time.

} */

function getValidUser() {
    return axios.get('/allowed_user.json')
        .then(response => {
            const spAllowedUsers = [];
            const userList = {...response.data};
            if (userList) {
                for (let key in userList) {
                    // userList[key]['id'] = key;
                    spAllowedUsers.push(userList[key].email);
                }
            }
            return spAllowedUsers;
        })
        .catch(error => {
            return error;
        });
}
function addAllowedUser(email) {
    return axios.post('/allowed_user.json',{email:email})
        .then(response => {
            console.log(response)
            return response;
        })
        .catch(error => {
            return error;
        });
}

/* function addUser(userInfo) {
    return axios.post('/users.json', userInfo)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
}
function deleteUser(deleteId) {
    return axios.delete(`/users/${deleteId}.json`, deleteId)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
} */

function getPlayers() {
    return axios.get('/players.json')
        .then(response => {
            const spPlayers = [];
            const playeList = {...response.data};
            if (playeList) {
                for (let key in playeList) {
                    playeList[key]['id'] = key;
                    spPlayers.push(playeList[key]);
                }
            }
            return spPlayers;
        })
        .catch(error => {
            return error;
        });
}

function addPlayer(playerInfo) {
    return axios.post('/players.json', playerInfo)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
}

function deletePlayer(deleteId) {
    return axios.delete(`/players/${deleteId}.json`, deleteId)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
}

function updatePlayerBalance(playerId,balance) {
    return axios.put(`/players/${playerId}/balance.json`, balance)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
}


function getMatches() {
    // https://share-pay-61301.firebaseio.com/
    return axios.get('/matches.json')
        .then(response => {
            const spMatches = [];
            const matchList = {...response.data};
            if (matchList) {
                for (let key in matchList) {
                    matchList[key]['id'] = key;
                    spMatches.push(matchList[key]);
                }
            }
            return spMatches;
        })
        .catch(error => {
            return error;
        });
}
function addMatch(matchInfo) {
    return axios.post('/matches.json', matchInfo)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
}

function deleteMatch(deleteId) {
    return axios.delete(`/matches/${deleteId}.json`, deleteId)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
}