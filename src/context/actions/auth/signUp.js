import AxiosInstance from '../../../helpers/axiosConfig';
import {
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  CLEAR_ATH_STATE,
} from '../../../constants/actionTypes';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_ATH_STATE,
  });
};

export default ({
    email,
    password,
    userName: username,
    firstName: first_name,
    lastName: last_name,
    role,
    tag,
  }) =>
  authDispatch =>
  onSuccess => {
    authDispatch({
      type: SIGNUP_LOADING,
    });
    AxiosInstance.post('/api/v1/auth/signup', {
      email,
      password,
      username,
      first_name,
      last_name,
      role,
      tag,
    })
      .then(res => {
        console.log(res);
        authDispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
        onSuccess(res.data);
      })
      .catch(err => {
        console.log(err);
        authDispatch({
          type: SIGNUP_FAIL,
          payload: err.response
            ? err.response.data
            : {error: 'something went wrong'},
        });
      });
  };
