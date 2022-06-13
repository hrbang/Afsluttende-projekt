import React, { useRef, useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import router from 'next/router';

// Bootstrap
import { Form, Button } from 'react-bootstrap';

export default function RegisterForm({ show }) {
  const form = useRef({});
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordsSame, setPasswordsSame] = useState(true);
  const [loading, setLoading] = useState(false);

  const buttonOnClick = async (ev) => {
    ev.preventDefault();
    if (loading) return;
    if (form.current.password.value === form.current.confirmPassword.value) {
      setLoading(true);
      const formValues = {
        firstName: form.current.firstName.value,
        lastName: form.current.lastName.value,
        email: form.current.email.value,
        username: form.current.username.value,
        password: form.current.password.value
      };
      const response = await axios.post('/api/user/register', formValues);
      if (response.data.success == false) {
        setErrorMessage(response.data.error);
        setIsError(true);
        setLoading(false);
      } else {
        setIsError(false);

        const loginResponse = await signIn('credentials', {
          redirect: false,
          email: form.current.email.value,
          password: form.current.password.value
        });

        if (loginResponse.ok) {
          router.push('/');
        }
      }
    } else {
      setPasswordsSame(false);
    }
  };

  const onPasswordInputsChange = () => {
    if (form.current.password.value.length > 0 && form.current.confirmPassword.value.length > 0) {
      setPasswordsSame(form.current.password.value === form.current.confirmPassword.value);
    }
  };

  return (
    <div className={show == true ? 'auth register' : 'auth register hidden'}>
      <div className='auth_inner'>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicFirstname'>
            <Form.Label>First & Last name</Form.Label>
            <div className='d-flex'>
              <Form.Control
                className='me-1'
                type='name'
                placeholder='First name'
                ref={(input) => (form.current.firstName = input)}
              />
              <Form.Control
                className='ms-1'
                type='name'
                placeholder='Last name'
                ref={(input) => (form.current.lastName = input)}
              />
            </div>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' ref={(input) => (form.current.email = input)} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='username' placeholder='Username' ref={(input) => (form.current.username = input)} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <div className='d-flex'>
              <Form.Control
                className='me-1'
                type='password'
                placeholder='Password'
                onChange={onPasswordInputsChange}
                ref={(input) => (form.current.password = input)}
              />
              <Form.Control
                className='ms-1'
                type='password'
                placeholder='Confirm Password'
                onChange={onPasswordInputsChange}
                ref={(input) => (form.current.confirmPassword = input)}
              />
            </div>
          </Form.Group>
          <Button variant='primary' type='submit' onClick={buttonOnClick}>
            Sign up
          </Button>
        </Form>
      </div>
    </div>
  );
}
