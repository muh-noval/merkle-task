import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Simpan token ke localStorage
        localStorage.setItem("token", data.token);

        // Setelah itu, lakukan pengalihan halaman
        navigate("/user-list");
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          setError("Invalid username or password");
        } else {
          setError(errorData.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error during login");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={values.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
