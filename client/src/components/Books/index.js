import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../../services/book.service';
import MainLayout from '../MainLayout';
import { Button, Col, Flex, Space, Table } from 'antd';
import BookModal from './BookModal';
import { ADD, EDIT } from '../../utils/config';
import { Link, useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [modalState, setModalState] = useState({
    action: ADD,
    open: false,
    editBook: null,
    loading: false,
  });
  const getBooks = () => {
    getAllBooks(searchInput).then((results) => setBooks(results));
  };
  useEffect(() => {
    getBooks();
  }, [searchInput]);

  const showBookModal = (action, obj) => {
    setModalState({ action, editBook: obj, open: true });
  };

  const handleCancel = () => {
    setModalState({ editBook: null, open: false });
  };

  const columns = [
    {
      title: 'UID',
      dataIndex: 'uniqueId',
      key: 'uniqueId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Date Of Publication',
      dataIndex: 'dateOfPublication',
      key: 'dateOfPublication',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showBookModal(EDIT, record)}>Edit {record.name}</a>
          <Link to={`/books/${record._id}/borrowers`}>View Borrowers</Link>
        </Space>
      ),
    },
  ];
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    if (info?.source == 'input') {
      setSearchInput(value);
    }
    if (info?.source == 'clear') {
      setSearchInput('');
    }
  };
  return (
    <MainLayout>
      <BookModal
        state={modalState}
        setState={setModalState}
        onCancel={handleCancel}
        getBooks={getBooks}
      />
      <h1>Showing All books</h1>
      <Flex style={{ justifyContent: 'end', padding: 5 }}>
        <Button onClick={() => showBookModal(ADD, null)}>Add New</Button>
      </Flex>
      <Flex>
        <Col md={12} style={{ alignSelf: 'flex-end' }}>
          <Search
            placeholder="search with book's author or title"
            onSearch={onSearch}
            enterButton
            allowClear
          />
        </Col>
      </Flex>
      <Table columns={columns} dataSource={books} />
    </MainLayout>
  );
}
