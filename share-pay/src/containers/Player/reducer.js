import { LOAD_PLAYER,ADD_ADMIN_LIST } from './constants';

// The initial state of the App
export const initialState = {
};

const playerReducer = (state = initialState, action) =>{
  switch (action.type) {
    case LOAD_PLAYER: {
        console.log('LOAD_PLAYER',action)
      const newState = {
        ...state,
        playerList:action.playerList
      };
      return newState;
    }
    case ADD_ADMIN_LIST: {
        console.log(action.adminList)
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

export default playerReducer;
