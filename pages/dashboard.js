import React from 'react';
import Background from '../components/Background';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import dbConnect from '../lib/dbConnect';
import User from '../models/User';

// Bootstrap
import { Container, Row, Col, Form } from 'react-bootstrap';

export default function dashboard({ user }) {
  console.log(user);
  return (
    <div className='main'>
      <div className='dashboard'>
        <div className='wrapper'>
          <Container>
            <Row>
              <Col lg={4} className='mb-4'>
                <div className='username content'>
                  <p className='username_title cat'>Username</p>
                  <p className='username_name item'>{user.username}</p>
                </div>
              </Col>
              <Col lg={4} className='mb-4'>
                <div className='email content'>
                  <p className='email_title cat'>E-mail</p>
                  <p className='email_name item'>{user.email}</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='password content'>
                  <p className='password_title cat'>Password</p>
                  <p className='passworld_pass item'>Password</p>
                </div>
              </Col>
              <Col lg={12}>
                <div className='description content'>
                  <p className='desc_title cat'>Description</p>
                  <Form>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                      <Form.Control as='textarea' rows={3} />
                    </Form.Group>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Background />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/authentication',
        permanent: false
      }
    };
  }
  await dbConnect();
  const user = await User.findOne({ _id: session.user._id });

  return {
    props: {
      user: {
        id: user._id.toString(),
        email: user.email ? user.email : null,
        username: user.email ? user.username : null,
        firstName: user.firstName ? user.firstName : null,
        lastName: user.lastName ? user.lastName : null
      }
    }
  };
}
