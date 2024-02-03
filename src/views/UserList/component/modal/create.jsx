import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const UserCreateModal = ({ showModal, handleCloseModal, handleCreate }) => {
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
    name: {
      firstname: "",
      lastname: "",
    },
    address: {
      city: "",
      street: "",
      number: 0,
      zipcode: "",
      geolocation: {
        lat: "",
        long: "",
      },
    },
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      name: {
        ...prevUser.name,
        [name]: value,
      },
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value,
      },
    }));
  };

  const handleGeolocationChange = async () => {
    try {
      const position = await getCurrentPosition();
      setNewUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          geolocation: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
        },
      }));
    } catch (error) {
      console.error("Error getting geolocation:", error);
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    if (showModal) {
      handleGeolocationChange();
    }
  }, [showModal]);

  const handleSubmit = () => {
    handleCreate(newUser);
    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstname"
                  value={newUser.name.firstname}
                  onChange={handleNameChange}
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastname"
                  value={newUser.name.lastname}
                  onChange={handleNameChange}
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  value={newUser.address.city}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter street"
                  name="street"
                  value={newUser.address.street}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter number"
                  name="number"
                  value={newUser.address.number}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formZipcode">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter zipcode"
                  name="zipcode"
                  value={newUser.address.zipcode}
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formLat">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter latitude"
                  name="lat"
                  value={newUser.address.geolocation.lat}
                  onChange={handleGeolocationChange}
                  readOnly
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formLong">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter longitude"
                  name="long"
                  value={newUser.address.geolocation.long}
                  onChange={handleGeolocationChange}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" onClick={handleSubmit}>
            Create User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserCreateModal;
