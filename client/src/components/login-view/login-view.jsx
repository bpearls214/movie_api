// client/src/login-view/login-view.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './login-view.scss';
import { Button, Form } from "react-bootstrap";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://cineme-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user!')
      });
  };

  return (
    <Form className="login-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label> Username: </Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label> Password: </Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
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