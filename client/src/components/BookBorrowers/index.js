import React from 'react';
import MainLayout from '../MainLayout';
import { Button, Flex, Space, Table } from 'antd';

export default function BookBorrowerList() {
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
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button>Return</Button>
        </Space>
      ),
    },
  ];
  return (
    <MainLayout>
      <h1>Showing All Borrowers for this book </h1>
      <Flex style={{ justifyContent: 'space-between', padding: 5 }}>
        <Button>Back</Button>
        <Button>Add New</Button>
      </Flex>
      <Table columns={columns} dataSource={[]} />
    </MainLayout>
  );
}
