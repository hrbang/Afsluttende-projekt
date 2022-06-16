import React, { useRef, useState, useEffect } from "react"
import Background from "../components/Background"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import dbConnect from "../lib/dbConnect"
import User from "../models/User"
import axios from "axios"

// Bootstrap
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap"

export default function dashboard({ user }) {
    const [isError, setIsError] = useState(false)
    const [users, setUsers] = useState([])
    const [jokeSetup, setJokeSetup] = useState("")
    const [jokePunchline, setJokePunchline] = useState("")
    const [jokeShow, setJokeShow] = useState(null)
    const form = useRef({})

    const options = {
        method: "GET",
        url: "https://jokeapi-v2.p.rapidapi.com/joke/Any",
        params: {
            format: "json",
            idRange: "0-150",
            type: "twopart",
        },
        headers: {
            "X-RapidAPI-Key": "fb8d3b8980msh570fcd900c3bd18p168c0ajsnfabae8ef5bb9",
            "X-RapidAPI-Host": "jokeapi-v2.p.rapidapi.com",
        },
    }

    const handleNewDescription = async () => {
        const newDescription = await axios.post("api/user/newDescription", {
            _id: user.id,
            description: form.current.description.value,
        })
        if (newDescription.data.success == false) {
            setIsError(true)
        } else {
            setIsError(false)
        }
    }
    const handleResetPassword = async () => {
        const newDescription = await axios.post("api/user/resetPassword", {
            _id: user.id,
            passwordOne: form.current.passwordOne.value,
            passwordTwo: form.current.passwordTwo.value,
        })
        if (newDescription.data.success == false) {
            setIsError(true)
        } else {
            setIsError(false)
        }
    }

    async function handleUserRoleChange(user) {
        if (form.current.role) {
            const newRole = await axios.post("api/user/roleChange", {
                _id: user._id,
                role: form.current.role.value,
            })
            if (newRole.data.success == false) {
                setIsError(true)
            } else {
                setIsError(false)
            }
        } else {
            return
        }
    }

    const handlePunchlineShow = () => {
      setJokeShow((jokeShow) => !jokeShow)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get("/api/user/users")
                setUsers(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        const fetchJoke = async () => {
            try {
                await axios
                    .request(options)
                    .then(function (response) {
                        setJokeSetup(response.data.setup)
                        setJokePunchline(response.data.delivery)
                    })
                    .catch(function (error) {
                        console.error(error)
                    })
            } catch (error) {
                console.error(error)
            }
        }
        fetchJoke()
        fetchData()
    }, [])

    return (
        <div className="main">
            <div className="dashboard">
                <div className="wrapper">
                    <Container>
                        <Row>
                            <Col lg={4} className="mb-4">
                                <div className="username content">
                                    <p className="username_title cat">Username</p>
                                    <p className="username_name item">{user.username}</p>
                                </div>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <div className="email content">
                                    <p className="email_title cat">E-mail</p>
                                    <p className="email_name item">{user.email}</p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="role content">
                                    <p className="role_title cat">Role</p>
                                    <p className="role_pass item">{user.role}</p>
                                </div>
                            </Col>
                            <Col lg={12} className="mb-4">
                                <div className="description content">
                                    <p className="desc_title cat">Random Dad Joke</p>
                                    <div className="dad-joke">
                                        <p className="joke">{jokeSetup}</p>
                                        <p onClick={() => handlePunchlineShow()} className={jokeShow == true ? "reveal show" : "punchline show"}>{jokeShow == true ? `${jokePunchline}` : "Reveal punchline"}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={12} className="mb-4">
                                <div className="description content">
                                    <p className="desc_title cat">Description</p>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control as="textarea" rows={3} placeholder={user.description} ref={(input) => (form.current.description = input)} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" onClick={handleNewDescription}>
                                            Save
                                        </Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col lg={12} className="mb-4">
                                <div className="password content">
                                    <p className="password_title cat">Password</p>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <div className="password_fields">
                                                <Form.Control type="password" ref={(input) => (form.current.passwordOne = input)} placeholder="Enter Password" />
                                                <Form.Control type="password" className="mx-3" ref={(input) => (form.current.passwordTwo = input)} placeholder="Repeat Password" />
                                                <Button variant="primary" type="submit" onClick={handleResetPassword}>
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
                                        <p className="userlist_title cat">Platform Users</p>
                                        <div className="userlist_users mt-4">
                                            <Table striped>
                                                <thead>
                                                    <tr>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>E-mail</th>
                                                        <th>Username</th>
                                                        <th>Role</th>
                                                        <th>Actions</th>
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
                                                                    <select name="role" ref={(input) => (form.current.role = input)}>
                                                                        <option selected value={user.role}>
                                                                            {user.role}
                                                                        </option>
                                                                        <option value="user">User</option>
                                                                        <option value="admin">Admin</option>
                                                                        <option value="superadmin">Super admin</option>
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <Button variant="primary" onClick={() => handleUserRoleChange(user)}>
                                                                        Update
                                                                    </Button>
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
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: "/authentication",
                permanent: false,
            },
        }
    }
    await dbConnect()
    const user = await User.findOne({ _id: session.user._id })

    return {
        props: {
            user: {
                id: user._id.toString(),
                email: user.email ? user.email : null,
                username: user.username ? user.username : null,
                description: user.description ? user.description : null,
                role: user.role ? user.role : null,
                firstName: user.firstName ? user.firstName : null,
                lastName: user.lastName ? user.lastName : null,
            },
        },
    }
}
