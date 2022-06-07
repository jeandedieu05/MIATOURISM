/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import Container from '../../components/common/container/index';
import LoginComponent from '../../components/login/login';
import {GlobalContext} from '../../context/provider';
import loginUser from '../../context/actions/auth/loginUser';

const Login = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [justSignedUp, setJustSignedUp] = useState(false);
  // const {navigate} = useNavigation();
  const {params} = useRoute();

  useEffect(() => {
    // console.log(params);
    if (params?.data) {
      setJustSignedUp(true);
      setForm({...form, userName: params.data.username});
      console.log('Login', params);
    }
  }, [params]);
  const {
    authState: {error, loading, data},
    authDispatch,
  } = useContext(GlobalContext);

  const onSubmit = () => {
    if (form.userName && form.password) {
      console.log(form.userName, form.password);
      loginUser(form)(authDispatch);
    }
  };
  const onChange = ({name, value}) => {
    setJustSignedUp(false);
    setForm({...form, [name]: value});

    if (value !== '') {
      if (name === 'password') {
        if (value.length < 8) {
          setErrors(prev => {
            return {...prev, [name]: 'This field needs minimum 8 characters'};
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      setErrors(prev => {
        return {...prev, [name]: 'This field is required'};
      });
    }
  };
  return (
    <Container>
      <LoginComponent
        onChange={onChange}
        onSubmit={onSubmit}
        form={form}
        errors={errors}
        error={error}
        loading={loading}
        justSignedUp={justSignedUp}
      />
    </Container>
  );
};
export default Login;
