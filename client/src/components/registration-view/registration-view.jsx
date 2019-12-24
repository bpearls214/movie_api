// client/src/registration-view/registration-view.jsx
import React, { useState } from 'react';
import './registration-view.scss';
import axios from 'axios';
import { Button, Form } from "react-bootstrap";

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("https://cineme-api.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  return (
    <Form className="registration-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label> Username: </Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => createUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label> Password: </Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => createPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => createEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicBirthday">
        <Form.Control
          type="text"
          placeholder="Enter Date of Birth"
          value={birthday}
          onChange={(e) => createBirthday(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >Submit
      </Button>
    </Form >
  );
}