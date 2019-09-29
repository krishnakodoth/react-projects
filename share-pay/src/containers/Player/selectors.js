import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = (state) => state.global || initialState;

const selectRoute = (state) => state.router;

const makeSelectPlayeList = () => createSelector(
  selectGlobal,
  (globalState) => globalState.currentUser
);

export {
  selectGlobal,
  selectRoute,
  makeSelectPlayeList
};
