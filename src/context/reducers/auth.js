import {
    SIGNUP_LOADING,
    SIGNUP_SUCCESS,
    CLEAR_ATH_STATE,
    SIGNUP_FAIL,
    LOGIN_LOADING,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_USER,
  } from '../../constants/actionTypes';
  
  const auth = (state, {type, payload}) => {
    switch (type) {
      case LOGIN_LOADING:
      case SIGNUP_LOADING:
        return {
          ...state,
          loading: true,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          loading: false,
          data: payload,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          data: payload,
          isLoggedIn: true,
        };
      case LOGIN_FAIL:
      case SIGNUP_FAIL:
        return {
          ...state,
          loading: false,
          error: payload,
        };
      case CLEAR_ATH_STATE:
        return {
          ...state,
          loading: false,
          data: null,
          error: null,
        };
      case LOGOUT_USER:
        return {
          ...state,
          loading: false,
          data: null,
          isLoggedIn: false,
        };
      default:
        return state;
    }
  };
  export default auth;
  