import { AUTH_SUCCESS, AUTH_FAILED, LOAD_ACCOUNT, LOGOUT_SUCCESS } from './actionTypes';
import Cookies from 'js-cookie';

export const authSuccess = (response) => {
  return {
    type: AUTH_SUCCESS,
    token: response.jwt,
    user: response.user
  }
}

export const authFailed = () => {
  return {
    type: AUTH_FAILED
  }
}

export const loadAccount = (response) => {
  return {
    type: LOAD_ACCOUNT,
    user: response,
    token: Cookies.get('token')
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}