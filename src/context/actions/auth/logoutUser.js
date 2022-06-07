import AxiosInstance from '../../../helpers/axiosConfig';
import {LOGOUT_USER} from '../../../constants/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => dispatch => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('role');
  dispatch({
    type: LOGOUT_USER,
  });
};
