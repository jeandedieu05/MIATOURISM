/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {useState, useContext, useEffect} from 'react';
import Container from '../../components/common/container/index';
import SignUpComponent from '../../components/signUp/signUp';
import signUpUser, {clearAuthState} from '../../context/actions/auth/signUp';
import {GlobalContext} from '../../context/provider';

const SignUp = () => {
  const [form, setForm] = useState({role: 'author', tag: 'teacher'});
  const [errors, setErrors] = useState({});
  const {navigate} = useNavigation();
  const {
    authState: {error, loading, data},
    authDispatch,
  } = useContext(GlobalContext);

  // useEffect(() => {
  //   console.log(data);
  //   if (data) {
  //     navigate('Login');
  //   }
  // }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (data || error) {
          clearAuthState()(authDispatch);
        }
      };
    }, [data, error]),
  );

  const onChange = ({name, value}) => {
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

  const onSubmit = () => {
    if (!form.userName) {
      setErrors(prev => {
        return {...prev, userName: 'Please add a username'};
      });
    }
    if (!form.firstName) {
      setErrors(prev => {
        return {...prev, firstName: 'Please add a first name'};
      });
    }
    if (!form.lastName) {
      setErrors(prev => {
        return {...prev, lastName: 'Please add a last name'};
      });
    }
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: 'Please add a email'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: 'Please add a password'};
      });
    }
    if (!form.role) {
      setErrors(prev => {
        return {...prev, role: 'Please add a role'};
      });
    }
    if (!form.tag) {
      setErrors(prev => {
        return {...prev, tag: 'Please add a tag'};
      });
    }

    if (
      Object.values(form).length === 7 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      signUpUser(form)(authDispatch)(response => {
        navigate('Login', {data: response});
      });
    }
  };
  return (
    <Container>
      <SignUpComponent
        onChange={onChange}
        onSubmit={onSubmit}
        form={form}
        errors={errors}
        error={error}
        loading={loading}
      />
    </Container>
  );
};
export default SignUp;
