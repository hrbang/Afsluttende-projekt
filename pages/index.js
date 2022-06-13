import Head from "next/head"
import router from "next/router"

// Components
import Background from '../components/Background'

// Bootstrap
import { Container, Row, Col, Button } from "react-bootstrap"

export default function Home() {
    return (
        <div className="root">
            <Head>
                <title>Project &mdash; 41</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="main">
                <div className="signin">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="signin_wrapper">
                                    <h1 className="signin_wrapper__title">Currently not logged in</h1>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={() => {
                                            router.push("/authentication")
                                        }}>
                                        Authenticate
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Background />
                </div>
            </main>
        </div>
    )
}
