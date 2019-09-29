import { userService } from '../services/users.services';
import { 
    LOAD_CURRENT_USER,
    LOAD_SP_CONFIG,
    SET_USER_ID,
    LOAD_PLAYER,
    ADD_ADMIN_LIST
   } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: null,
  isAuthenticated:false,
  currentUserId:null,
  playerList:null,
  adminList:null
};

const appReducer = (state = initialState, action) =>{
  switch (action.type) {
    case LOAD_CURRENT_USER: {
      // Load Player
      const players = userService.getPlayers().then(playeList=>playeList);
      if(action.currentUser){
        localStorage.setItem('app_sp_token',action.currentUser.uid);        
      }
      else{
        localStorage.removeItem('app_sp_token');
      }
      const newState = {
        ...state,
        loading: false,
        error: false,
        currentUser: action.currentUser,
        currentUserId:action.currentUser.uid,
        isAuthenticated: (action.currentUser)?true:false,
        players:players
      };

      return newState;
    }
    
    
    /** PLAYERS */
    case SET_USER_ID: {
    const newState = {
      ...state,
      currentUserId:action.currentUserId
    };
    return newState;
  }
  
    case LOAD_PLAYER: {
        console.log('LOAD_PLAYER',action)
      const newState = {
        ...state,
        playerList:action.playerList
      };
      return newState;
    }
  case ADD_ADMIN_LIST: {
      console.log('ADD_ADMIN_LIST',action.adminList)
      const newState = {
        ...state,
        adminList:action.adminList
      };
      return newState;
    }

    
    default:
      return state;
  }
}

export default appReducer;
