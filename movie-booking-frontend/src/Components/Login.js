import { Button, Col, Container, Form, Row, Image, Alert } from "react-bootstrap";
import Footer from "./footer";
import "../css/login.css";
import { useState } from "react";
import Cookie from 'universal-cookie';
import superagent from 'superagent';
import { Link, Navigate, Redirect } from "react-router-dom";

export default function Login(props) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [roles, setRoles] = useState(false);
  const [username, setUsername] = useState(false);
  const [isUnauth, setUnAuth] = useState(false);
  const cookie = new Cookie();

  let login = async (loginId, password) => {
    superagent
      .post("http://localhost:8081/api/v1.0/moviebooking/login")
      .send({
        loginId: loginId,
        password: password
      })
      .then((response) => {
        if (response.body.accessToken) {
          setAccessToken(response.body.accessToken);
          cookie.set('accessToken', response.body.accessToken, { path: '/',maxAge: 1800 })
          cookie.set('roles', response.body.roles, { path: '/',maxAge:1800 })
          cookie.set('username', response.body.username, { path: '/',maxAge:1800 })
          setRoles(response.body.roles);
          setUsername(response.body.username)
        }
      })
      .catch((err) => {
        console.log(err);
        setUnAuth(true);
      });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    await login(loginId, password);
  };

  // function MyComponent ({ roles } {
  //   if (roles == 'ROLE_ADMIN') {
  //     return <Redirect to="/home" />;
  //   }
  // }
  return (
    <>
      {roles == 'ROLE_ADMIN' ? (
        <Navigate to='/homeadmin' />
      ): roles == 'ROLE_USER' ? (
        <Navigate to='/home' />
      ) : (
        <div>
          <Container className="login" fluid>
            {(isUnauth ?
              <>
                <Alert variant="danger" key="danger">Invalid Credentials, try again</Alert>
                <br />
              </>
              : <div></div>)}
            <Row>
              <Col sm>
                <Image
                  src={require("../images/login_page.png")}
                  fluid
                />
              </Col>
              <Col sm>
                <h2 className="text-primary">Welcome to moviebooking.com</h2>
                <br></br>
                <h3 className="text-secondary">Login Page</h3>
                <br />
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-secondary">Login Id</Form.Label>
                    <Form.Control
                      type="text"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      placeholder="Enter your Login Id"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="text-secondary">Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                      required
                    />
                    <Form.Text className="text-muted px-1">
                      Note: The login validity is for only 30 minutes
                    </Form.Text>
                  </Form.Group>
                  <div>
                   <span className="text-secondary ml-2">Forgot password? <Link to='/resetpassword'>Reset now</Link></span>
                  <span className="text-secondary ml-5">Don't have an account? <Link to='/register'>Create now</Link></span>
                 </div>
                  <br />
                  <button className="btn btn-primary btn-block" type="submit">
                    Submit
                  </button>
                </Form>
              </Col>
            </Row>
          </Container>
          <Footer />
        </div>
      )}
    </>
  );
}
