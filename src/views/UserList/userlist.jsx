import { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
      }
    };

    fetchData();
  }, []);

  //   detail
  const handleDetail = async (userId) => {
    setSelectedUserId(userId);

    try {
      const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      setSelectedUser(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Failed to fetch user details");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //   Edit
  const handleEdit = (userId) => {
    console.log(`Edit user with ID ${userId}`);
  };

  return (
    <div>
      <h1>User List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.name?.firstname} ${user.name?.lastname}`}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>
                {user.address
                  ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
                  : ""}
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleDetail(user.id)}
                >
                  Detail
                </Button>{" "}
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for User Detail */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>ID: {selectedUser.id}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Username: {selectedUser.username}</p>
              <p>
                Name:{" "}
                {`${selectedUser.name?.firstname} ${selectedUser.name?.lastname}`}
              </p>
              <p>
                Address:{" "}
                {selectedUser.address
                  ? `${selectedUser.address.street}, ${selectedUser.address.city}, ${selectedUser.address.zipcode}`
                  : ""}
              </p>
              <p>Phone: {selectedUser.phone}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
