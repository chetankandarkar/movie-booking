
import { useState } from "react";
import { Col, Container, Form, Image, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import superagent from 'superagent';
import Footer from "./footer";

export default function ResetPassword() {

    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [isErr, setErr] = useState(false);
    const [isCreated, setCreated] = useState(false);
    const [message, setMessage] = useState("");

    let handleRegister = async (e) => {
        e.preventDefault();
        if (password != confirmpassword) {
            setErr(true);
            setMessage("Password and confirm password doesn't match");
        } else {
            superagent
                .put(`http://localhost:8081/api/v1.0/moviebooking/${loginId}/forgot`)
                .send({
                    loginId: loginId,
                    password: password
                })
                .then((response) => {
                    console.log(response);
                    setErr(false);
                    setCreated(true);
                })
                .catch((err) => {
                    setErr(true);
                    setMessage(err.response.body.message);
                })
        }
    }

    let clear = () => {
        document.getElementById('loginId').value = '';
        setLoginId("");
        document.getElementById('password').value = '';
        setPassword("");
        document.getElementById('confirmpassword').value = '';
        setConfirmPassword("");
        

    }

    return (
        <>
            {isErr ?
                <>
                    <Alert className="container my-4" variant="danger" key="danger">{message}</Alert>
                    <br />
                </>
                : <div></div>}
            <Container className="my-4">
                {isCreated ?
                    <>
                        <Alert variant="success" key="success">Password Reset Successfully</Alert>
                        <br />
                    </>
                    : <div></div>}
                <Row>
                    <Col sm>
                        <Image
                            src={require("../images/forgot_password.png")}
                            fluid
                        />
                    </Col>
                    <Col sm>
                        <h2 className="text-secondary">Reset Password</h2>
                        <br />
                        <Form onSubmit={handleRegister}>
                            <Form.Group className="mb-3" controlId="loginId">
                                <Form.Label className="text-secondary">Login ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={loginId}
                                    onChange={(e) => setLoginId(e.target.value)}
                                    placeholder="Enter your Login ID"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="text-secondary">Create New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create new Password"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="confirmpassword">
                                <Form.Label className="text-secondary">Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter Password"
                                    required
                                />
                            </Form.Group>

                            <div className="text-right pt-0">
                                <span className="text-secondary">Sign in again? <Link to='/'>Click here</Link></span>
                            </div>
                            <Row className="py-4">
                                <Col>
                                    <button className="btn btn-primary btn-block" type="submit">
                                        Submit
                                    </button>
                                </Col>
                                <Col>
                                    <button onClick={clear} className="btn btn-outline-danger btn-block">
                                        Clear
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer />

            <br />
        </>
    );
}