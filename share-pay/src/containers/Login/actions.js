/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
    LOAD_CURRENT_USER,
    ADD_ADMIN_LIST,
    LOAD_PLAYER
  } from  '../../store/constants';
  
  
  /**
   * Load the repositories, this action starts the request saga
   *
   * @return {object} An action object with a type of LOAD_REPOS
   */
  export function loadCurrentUser(currentUser) {
    return {
      type: LOAD_CURRENT_USER,
      currentUser
    };
  }

  /**
   * Load the repositories, this action starts the request saga
   *
   * @return {object} An action object with a type of LOAD_REPOS
   */
  export function loadPlayers(playerList) {
    return {
      type: LOAD_PLAYER,
      playerList
    };
  }

   /**
   * Load the repositories, this action starts the request saga
   *
   * @return {object} An action object with a type of LOAD_REPOS
   */
  export function addAdminList(adminList) {
    return {
      type: ADD_ADMIN_LIST,
      adminList
    };
  }
  
  
  /**
   * Load the repositories, this action starts the request saga
   *
   * @return {object} An action object with a type of LOAD_REPOS
   */
  export function logoutUser() {
    return {
      type: LOAD_CURRENT_USER,
      currentUser:null
    };
  }