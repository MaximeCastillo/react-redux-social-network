import { AUTH_SUCCESS , AUTH_FAILED, LOAD_ACCOUNT, LOGOUT_SUCCESS } from './actionTypes';
import Cookies from 'js-cookie';

const initialState = {
  token: null,
  isAuthenticated: null,
  user: null
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_ACCOUNT:
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        user: action.user
      }
    case AUTH_SUCCESS:
      Cookies.set('token', action.token , { expires: 7 })
      return {
        ...state,
        ...action.token,
        token: action.token,
        isAuthenticated: true,
        user: action.user
      }
    case AUTH_FAILED:
    case LOGOUT_SUCCESS:
      Cookies.remove('token')
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false
      }
    default: 
      return state
  }
}

export default authReducer;