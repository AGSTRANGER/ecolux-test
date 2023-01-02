import React, { useState } from "react";
import { useDispatch } from "react-redux";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      // Display an error message if the passwords don't match
      return;
    }
    // Construct the new user object
    const newUser = {
      email,
      password,
    };
    // Send a request to the backend API to create a new user
    signUp(newUser, dispatch);
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
            <FormGroup>
              <Label for="passwordConfirmation">Confirm Password</Label>
              <Input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                placeholder="Confirm your password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </FormGroup>
            <Button type="submit">Sign Up</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
