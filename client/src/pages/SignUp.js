import React, { useState } from "react";
import * as Components from "../components/CssForSN/Components/Components";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER, LOGIN_USER } from "../utils/mutations";

export default function SignUp(props) {
  const [signIn, toggle] = React.useState(true);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await loginUser({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="hero-container">
      <img src="/back/back4.jpeg" alt="backimg" />
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignUpSubmit}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <Components.Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleLoginSubmit}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <Components.Button>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend! </Components.Title>
              <Components.Paragraph></Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph></Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}