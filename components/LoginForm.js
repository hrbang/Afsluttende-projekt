import React from "react"
import Link from "next/link"

// Bootstrap
import { Form, Button } from "react-bootstrap"

export default function LoginForm() {
    return (
        <div className="loginform">
            <div className="loginform_inner">
                <div className="loginform_inner__header">
                    <h2 className="loginform_inner__header_title">Sign in</h2>
                    <p className="loginform_inner__header_signup">Don't have an account? <Link href="/"><a>Sign up here!</a></Link></p>
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign in
                    </Button>
                </Form>
            </div>
        </div>
    )
}
