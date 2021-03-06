import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ONGOING,
  SIGN_IN_FAILED,
  SIGN_OUT_SUCCESS,
  UPDATE_PROFILE,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  CREATE_USER_ONGOING,
  CREATE_USER_INIT,
} from './action-types';

export const initialState = {
  authenticated: 'FALSE',
  authInfo: "",
  uid: '',
  userRef: null,
  createUserStatus: "NULL",
  createUserInfo: ""
};

export function authReducer(state = initialState, action) {

  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {authenticated: "TRUE"})

    case SIGN_IN_ONGOING:
      return Object.assign({}, state, {authenticated: "ONGOING", authInfo: "auth ongoing..."})

    case SIGN_OUT_SUCCESS:
      return {authenticated: "FALSE"}

    case SIGN_IN_FAILED:
      return {authenticated: "FAILED", authInfo: action.payload}

    case UPDATE_PROFILE:
      return Object.assign({}, state, action.payload)

    case CREATE_USER_INIT:
      return Object.assign({}, state, {createUserStatus: "NULL", createUserInfo: ""})

    case CREATE_USER_ONGOING:
      return Object.assign({}, state, {createUserStatus: "ONGOING", createUserInfo: "waiting.."})

    case CREATE_USER_FAIL:
      return Object.assign({}, state, {createUserStatus: "FAIL", createUserInfo: action.payload})

    case CREATE_USER_SUCCESS:
      return Object.assign({}, state, {createUserStatus: "SUCCESS", createUserInfo: "create success"})

    default:
      return state
  }
  //return state;
}
