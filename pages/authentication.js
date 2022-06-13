import React, { useState } from "react"
import Link from "next/link"

// Components
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import Background from '../components/Background'

// Bootstrap
import { Container, Row, Col } from "react-bootstrap"

export default function login() {
    const [showRegister, setShowRegister] = useState(null)

    const handleFormVisibility = () => {
        setShowRegister((showRegister) => !showRegister)
    }

    return (
        <div className="main">
            <div className="login">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="login_wrapper">
                                <div className="login_wrapper__header">
                                    <h2 className="login_wrapper__header_title">{showRegister == true ? "Sign up" : "Sign in"}</h2>
                                    <p className="login_wrapper__header_signup">
                                        {showRegister == true ? "Already have an account?" : "Don't have an account?"}{" "}
                                        <button className="link" onClick={(e) => handleFormVisibility()}>
                                            {showRegister == true ? "Sign in here!" : "Sign up here!"}
                                        </button>
                                    </p>
                                </div>
                                <div className="auth_forms">
                                    <LoginForm show={showRegister} />
                                    <RegisterForm show={showRegister} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Background />
            </div>
        </div>
    )
}
