import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Modal, Table } from 'react-bootstrap';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Toast from 'react-bootstrap/Toast';
import '../../shared/ListUsers.css';
import UpdateUser from './UpdateUser'
import { deleteReq, get, patchWithAuth, putWithAuth } from '../../../../shared/service/Api';
import DeleteUser from './DeleteUser';

export interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [showModalUpdate, setShowModalUpdate] = useState(false); 
  const [showModalDelete, setShowModalDelete] = useState(false); 
  const [userValue, setUserValue] = useState<User | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { isLoading,isError} = useQuery({
    queryFn:fetchUsers,
    queryKey:['users'],
    onSuccess: (data)=> setUsers(data)
  })

  useEffect(() => {
    if (showSuccessToast) {
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
    if (showErrorToast) {
      setTimeout(() => setShowErrorToast(false), 3000);
    }
  }, [showSuccessToast, showErrorToast]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleEdit = async (userData: User) => {
    setShowModalUpdate(true); 
    setUserValue(userData);
  };

  const handleDelete = async (userData: User) => {
    setShowModalDelete(true);
    setUserValue(userData);
  };

  return (
    <div className="container">

      <Toast onClose={() => setShowErrorToast(false)} show={showErrorToast} autohide>
        <Toast.Header>
          <strong className="mr-auto">Error!</strong>
        </Toast.Header>
        <Toast.Body>
          An error occurred. Please try again later.
        </Toast.Body>
      </Toast>

      <div className="search-container">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search by name... "
        />

      </div>

      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <div className="action-buttons">
                  <EditOutlined className="edit" onClick={() => handleEdit(user)} /> 
                  <DeleteOutlined className="delete" onClick={() => handleDelete(user)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModalUpdate} onHide={() => setShowModalUpdate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateUser userValue={userValue}/> 
        </Modal.Body>
      </Modal>

      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
        <Modal.Header closeButton>
        <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteUser userValue={userValue}/> 
        </Modal.Body>
      </Modal>
  </div>
  );
};

export default ListUsers;