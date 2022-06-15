import React, { useRef, useState, useEffect } from 'react';
import Background from '../components/Background';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import dbConnect from '../lib/dbConnect';
import User from '../models/User';
import axios from 'axios';

// Bootstrap
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

export default function dashboard({ user }) {
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const form = useRef({});
  console.log(users);

  const handleNewDescription = async () => {
    const newDescription = await axios.post('api/user/newDescription', {
      _id: user.id,
      description: form.current.description.value
    });
    if (newDescription.data.success == false) {
      setErrorMessage(response.data.error);
      setIsError(true);
      setLoading(false);
    } else {
      setIsError(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('/api/user/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
                <div className='role content'>
                  <p className='role_title cat'>Role</p>
                  <p className='role_pass item'>{user.role}</p>
                </div>
              </Col>
              <Col lg={12} className='mb-4'>
                <div className='description content'>
                  <p className='desc_title cat'>Description</p>
                  <Form>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder={user.description}
                        ref={(input) => (form.current.description = input)}
                      />
                    </Form.Group>
                    <Button variant='primary' type='submit' onClick={handleNewDescription}>
                      Save
                    </Button>
                  </Form>
                </div>
              </Col>
              <Col lg={12} className='mb-4'>
                <div className='password content'>
                  <p className='password_title cat'>Password</p>
                  <Form>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                      <div className="password_fields">
                        <Form.Control type="password" ref={(input) => (form.current.password = input)} />
                        <Form.Control type="password" className="mx-3" ref={(input) => (form.current.password = input)} />
                        <Button variant='primary' type='submit' onClick={handleNewDescription}>
                          Update
                        </Button>
                      </div>
                    </Form.Group>
                  </Form>
                </div>
              </Col>
              {user.role === "admin" && (
                <Col lg={12}>
                  <div className="userlist content">
                    <p className='userlist_title cat'>Platform Users</p>
                    {/* <div className="userlist_actions mt-4">
                      <Button variant='primary' type='submit' onClick={handleNewDescription}>
                        Create user
                      </Button>
                    </div> */}
                    <div className="userlist_users mt-4">
                      <Table striped>
                        <thead>
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>E-mail</th>
                            <th>Username</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => {
                            return (
                              <tr>
                                <td className="py-3">{user.firstName}</td>
                                <td className="py-3">{user.lastName}</td>
                                <td className="py-3">{user.email}</td>
                                <td className="py-3">{user.username}</td>
                                <td className="py-3">
                                  <select name="role">
                                    <option selected value={user.role}>{user.role}</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="superadmin">Super admin</option>
                                  </select>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Col>
              )}
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
        username: user.username ? user.username : null,
        description: user.description ? user.description : null,
        role: user.role ? user.role : null,
        firstName: user.firstName ? user.firstName : null,
        lastName: user.lastName ? user.lastName : null
      }
    }
  };
}
