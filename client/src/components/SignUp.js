import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { signUp } from "../actions/api";

const SignUp = () => {
  const signUpState = useSelector((state) => state.auth.sign_up);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    signUp(newUser, dispatch);
  };

  return (
    <Container className="mx-auto mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button type="submit">Sign Up</Button>
          </Form>
        </Col>
      </Row>
      {!!signUpState?.data && (
        <Row className="justify-content-center">
          <Col md="6">
            <div className="sign-up-success">
              <p>Congratulations, your sign up was successful!</p>
            </div>
          </Col>
        </Row>
      )}

      {!!signUpState?.error && (
        <Row className="justify-content-center">
          <Col md="6">
            <div className="sign-up-error">
              <p>Ooops, an error has occured :/</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SignUp;
