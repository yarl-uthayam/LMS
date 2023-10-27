import React, { useEffect, useState } from 'react';
import MainLayout from '../MainLayout';
import { Button, Flex, Space, Table } from 'antd';
import UserModal from './UserModal';
import { ADD } from '../../utils/config';
import { getAllUsers } from '../../services/user.service';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [modalState, setModalState] = useState({
    action: ADD,
    open: false,
    editUser: null,
    loading: false,
  });

  const showUserModal = (action, obj) => {
    setModalState({ action, editBook: obj, open: true });
  };

  const handleCancel = () => {
    setModalState({ editBook: null, open: false });
  };
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a>{text}</a>,
    },
  ];
  const getUsers = () => {
    getAllUsers().then((results) => setUsers(results));
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <MainLayout>
      <UserModal
        state={modalState}
        setState={setModalState}
        onCancel={handleCancel}
        getUsers={getUsers}
      />
      <h1>Showing All Users</h1>
      <Flex style={{ justifyContent: 'end', padding: 5 }}>
        <Button onClick={() => showUserModal(ADD, null)}>Add New</Button>
      </Flex>
      <Table columns={columns} dataSource={users} />
    </MainLayout>
  );
}
