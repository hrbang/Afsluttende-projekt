import React from "react"

// Components
import LoginForm from "../components/LoginForm"

// Bootstrap
import { Container, Row, Col } from "react-bootstrap"

export default function login() {
    return (
        <div className="login">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="login_wrapper">
                            <LoginForm />
                        </div>
                    </Col>
                </Row>
            </Container>
            <div class="shape-blob"></div>
            <div class="shape-blob one"></div>
            <div class="shape-blob two"></div>
        </div>
    )
}
