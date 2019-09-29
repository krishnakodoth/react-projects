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
    SET_USER_ID,
    SET_USER_EMAIL,
    LOAD_PLAYER,
    ADD_ADMIN_LIST
  } from '../../store/constants';
  
  
  
  /**
   * Load the repositories, this action starts the request saga
   *
   * @return {object} An action object with a type of LOAD_REPOS
   */
  export function setCurrentUserId(currentUserId) {
    return {
      type: SET_USER_ID,
      currentUserId
    };
  }

  /**
   * Load the repositories, this action starts the request saga
   *
   * @return {object} An action object with a type of LOAD_REPOS
   */
  export function setCurrentUserEmail(currentUserEmail) {
    return {
      type: SET_USER_EMAIL,
      currentUserEmail
    };
  }
  
  /**
   * Load the repositories, this action starts the request saga
   *
   * @return {object} An action object with a type of LOAD_REPOS
   */
  export function loadPlayerList(playerList) {
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