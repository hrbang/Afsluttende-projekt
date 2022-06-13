import React from "react"
import Background from "../components/Background"

// Bootstrap
import { Container, Row, Col, Form } from "react-bootstrap"

export default function dashboard() {
    return (
        <div className="main">
            <div className="dashboard">
                <div className="wrapper">
                    <Container>
                        <Row>
                            <Col lg={4} className="mb-4">
                                <div className="username content">
                                    <p className="username_title cat">Username</p>
                                    <p className="username_name item">@Username</p>
                                </div>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <div className="email content">
                                    <p className="email_title cat">E-mail</p>
                                    <p className="email_name item">email@jbnbhjb.dk</p>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="password content">
                                    <p className="password_title cat">Password</p>
                                    <p className="passworld_pass item">Password</p>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="description content">
                                    <p className="desc_title cat">Description</p>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control as="textarea" rows={3} />
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
    )
}
