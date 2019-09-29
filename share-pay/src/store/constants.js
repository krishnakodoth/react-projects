/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

/* export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en';
 */

export const LOAD_SP_CONFIG = 'sharePay/App/LOAD_SP_CONFIG';
export const LOAD_CURRENT_USER = 'sharePay/App/LOAD_CURRENT_USER';
export const SET_USER_ID = 'sharePay/Player/SET_USER_ID';
export const SET_USER_EMAIL = 'sharePay/Player/SET_USER_EMAIL';
export const LOAD_PLAYER = 'sharePay/Player/LOAD_PLAYER';
export const ADD_ADMIN_LIST = 'sharePay/Player/ADD_ADMIN_LIST';
