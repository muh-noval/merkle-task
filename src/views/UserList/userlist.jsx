import { useState, useEffect } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import UserDetailModal from "./component/modal/detail";
import UserCreateModal from "./component/modal/create";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // modal
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);

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
        setInfo({
          typeVariant: "danger",
          desc: "Failed to fetch users",
        });
      }
    };

    fetchData();
  }, []);

  // create
  const handleCreate = async (newUser) => {
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      console.log("User created successfully:", data);

      setShowModalCreate(false);
      setUsers((prevUsers) => [...prevUsers, data]);

      Swal.fire({
        title: "Success!",
        text: "User created successfully",
        icon: "success",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      setInfo({
        typeVariant: "danger",
        desc: "Failed to create user",
      });
    }
  };

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
      setShowModalDetail(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setInfo({
        typeVariant: "danger",
        desc: "Failed to fetch user details",
      });
    }
  };

  //   Edit
  const handleEdit = (userId) => {
    console.log(`Edit user with ID ${userId}`);
  };

  // Delete
  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Confirm Delete",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      performDelete(userId);
    }
  };

  const performDelete = async (userId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      console.log(data);
      setInfo({
        typeVariant: "success",
        desc: "Delete user success",
      });
    } catch (error) {
      setInfo({
        typeVariant: "danger",
        desc: "Failed to delete user",
      });
    }
  };

  // close alert
  const handleCloseInfo = () => {
    setInfo(null);
  };

  return (
    <div>
      <h1>User List</h1>
      {info && (
        <Alert variant={info.typeVariant} onClose={handleCloseInfo} dismissible>
          {info.desc}
        </Alert>
      )}
      <Button
        variant="success"
        size="sm"
        className="my-3"
        onClick={() => setShowModalCreate(true)}
      >
        Create New User
      </Button>
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
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <UserCreateModal
        showModal={showModalCreate}
        handleCloseModal={() => setShowModalCreate(false)}
        handleCreate={handleCreate}
      />
      <UserDetailModal
        user={selectedUser}
        showModal={showModalDetail}
        handleCloseModal={() => setShowModalDetail(false)}
      />
    </div>
  );
};

export default UserList;
