import { Modal, Button } from "react-bootstrap";

const UserDetailModal = ({ user, showModal, handleCloseModal }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>User Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user && (
          <div>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Name: {`${user.name?.firstname} ${user.name?.lastname}`}</p>
            <p>
              Address:{" "}
              {`${user.address?.street}, ${user.address?.city}, ${user.address?.zipcode}`}
            </p>
            <p>Phone: {user.phone}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailModal;
