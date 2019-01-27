import merge from 'xtend';
import createReducer from './create-reducer';
import { FETCH_DATA, FETCH_DATA_SUCCESS } from "../actions/main-page";

const INITIAL_STATE = {
  messages: [],
  isLoading: false
};

export default createReducer({
  [FETCH_DATA]: (state, action) => merge(state, {
    isLoading: true
  }),
  [FETCH_DATA_SUCCESS]: (state, action) => merge(state, {
    isLoading: false,
    messages: action.data
  })
}, INITIAL_STATE)