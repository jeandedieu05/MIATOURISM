import AxiosInstance from '../../../helpers/axiosConfig';
import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../../../constants/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({password, userName: username}) =>
  authDispatch => {
    authDispatch({
      type: LOGIN_LOADING,
    });
    AxiosInstance.post('/api/v1/auth/login', {
      password,
      username,
    })
      .then(res => {
        console.log('Answer', res.data);
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('role', JSON.stringify(res.data.role));

        authDispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        authDispatch({
          type: LOGIN_FAIL,
          payload: err.response
            ? err.response.data
            : {error: 'something went wrong'},
        });
      });
  };
