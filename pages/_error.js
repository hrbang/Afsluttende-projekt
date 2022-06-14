import React from 'react'

import Background from '../components/Background';
import {Container, Row, Col} from 'react-bootstrap'

export default function _404() {
    return (
        <div className="main">
            <div className="error">
                <Container>
                    <Row>
                        <Col lg={12}>
                <h1 className="d-flex justify-content-center align-items-center">404 Franskbrød not found</h1>    
                        </Col>
                    </Row>
                </Container>
            </div>          
            <Background />
        </div>
    )
}
