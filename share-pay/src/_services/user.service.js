import decode from 'jwt-decode';
import { authHeader } from '../_helpers/auth-header';
import { API_URL } from '../constants'


export const userService = {
    login,
    logout,
    loggedIn,
    getUserProfile,
    getAll,
    getPlayers,
    addPlayer,
    deletePlayer,
    getMatchList,
    addMatch,
    deleteMatch
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${API_URL}/user-auth`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // console.log(data)
            // login successful if there's a user in the response
            if (data) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
               /*  user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user)); */
               
                setToken(data.token);
            }
            return data;
        });
}

function loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = getToken() // GEtting token from localstorage
   //  console.log(token)
    return !!token && !isTokenExpired(token) // handwaiving here
}
function isTokenExpired(token) {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
            return true;
        }
        else
            return false;
    }
    catch (err) {
        return false;
    }
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('app_sp_token');
}

function setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('app_sp_token', idToken)
    //let cToken = getToken();
}

function getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('app_sp_token')
}

function getUserProfile() {
    let token = localStorage.getItem('app_sp_token')
    try {
        const decoded = decode(token);
        return (decoded);
    }
    catch (err) {
        return false;
    }
    // Retrieves the user token from localStorage
    // return localStorage.getItem('app_sp_token')
}

function getPlayers(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${API_URL}/get/player`, requestOptions).then(handleResponse);
}

function deletePlayer(playerId){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ player_id: playerId })
    };
    return fetch(`${API_URL}/delete/player`, requestOptions).then(handleResponse);
}
function addPlayer(formData){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
    };
    return fetch(`${API_URL}/add/player`, requestOptions).then(handleResponse);
}


function getMatchList(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${API_URL}/get/match`, requestOptions).then(handleResponse);
}

function addMatch(formData){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(formData)
    };
    return fetch(`${API_URL}/add/match`, requestOptions).then(handleResponse);
}

function deleteMatch(matchId){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ match_id: matchId })
    };
    return fetch(`${API_URL}/delete/match`, requestOptions).then(handleResponse);
}


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API_URL}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}