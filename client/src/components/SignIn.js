import React, { useEffect, useState } from "react";
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
import { signIn } from "../actions/api";

const SignIn = () => {
  const signInState = useSelector((state) => state.auth.sign_in);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const sign_in_info = {
      email,
      password,
    };
    signIn(sign_in_info, dispatch);
  };

  return (
    <Container className="mx-auto mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <Form onSubmit={handleSubmit}>
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

            <Button type="submit">Sign in</Button>
          </Form>
        </Col>
      </Row>

      {!!signInState?.error && (
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

export default SignIn;
