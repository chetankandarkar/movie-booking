
import { useState } from "react";
import { Col, Container, Form, Image, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import superagent from 'superagent';
import Footer from "./footer";

export default function Register() {

    const [loginId, setLoginId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
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
                .post("http://localhost:8081/api/v1.0/moviebooking/register")
                .send({
                    loginId: loginId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    contactNumber: contactNumber,
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
        document.getElementById('firstName').value = '';
        setFirstName("");
        document.getElementById('lastName').value = '';
        setLastName("");
        document.getElementById('email').value = '';
        setEmail("");
        document.getElementById('contactNumber').value = '';
        setContactNumber("");
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
                        <Alert variant="success" key="success">Account created successfully</Alert>
                        <br />
                    </>
                    : <div></div>}
                <Row>
                    <Col sm>
                        <Image
                            src={require("../images/signup.png")}
                            fluid
                        />
                    </Col>
                    <Col sm>
                        <h2 className="text-secondary">Registration Page</h2>
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
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label className="text-secondary">First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter your First Name"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label className="text-secondary">Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your Last Name"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label className="text-secondary">Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your Email"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="contactNumber">
                                <Form.Label className="text-secondary">Contact Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    placeholder="Enter your Contact Number"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="text-secondary">Create Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your Password"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="confirmpassword">
                                <Form.Label className="text-secondary">Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Enter your Confirm Password"
                                    required
                                />
                            </Form.Group>

                            <div className="text-right pt-0">
                                <span className="text-secondary">Already have an account? <Link to='/'>Sign in</Link></span>
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
            <br />
        </>
    );
}