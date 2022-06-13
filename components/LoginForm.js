import React, { useState, useRef, useEffect } from 'react';
import { signIn } from 'next-auth/react';

// Bootstrap
import { Form, Button } from 'react-bootstrap';

export default function LoginForm({ show }) {
  const form = useRef({});
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignin = async (ev) => {
    ev.preventDefault();
    if (loading) return;
    if (form.current.email.value.length === 0 || form.current.password.value.length === 0) {
      setError(true);
      return;
    }
    setLoading(true);
    const response = await signIn('credentials', {
      redirect: false,
      email: form.current.email.value,
      password: form.current.password.value
    });
    if (response.status != 200) {
      setError(true);
      setLoading(false);
    } else {
      setError(false);
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    return () => {};
  }, [isError, loading]);
  return (
    <div className={show == true ? 'auth hidden' : 'auth'}>
      <div className='auth_inner'>
        <Form onSubmit={handleSignin}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' ref={(input) => (form.current.email = input)} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' ref={(input) => (form.current.password = input)} />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
}
