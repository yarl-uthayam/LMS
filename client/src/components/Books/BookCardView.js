import { Avatar, Card, Col, Flex, Row } from 'antd';
import bookimg from '../../assets/book.jpg';
import React, { useEffect, useState } from 'react';
import Search from 'antd/es/input/Search';
import MainLayout from '../MainLayout';
import { getAllBooks } from '../../services/book.service';
const { Meta } = Card;
export default function BookCardView() {
  const [books, setBooks] = useState([]);
  const getBooks = () => {
    getAllBooks().then((results) => setBooks(results));
  };
  useEffect(() => {
    getBooks();
  }, []);
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <MainLayout>
      <Row className="">
        <Flex gap="middle" vertical style={{ width: '100%' }}>
          <Flex>
            <Col md={12} style={{ alignSelf: 'flex-end' }}>
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                enterButton
                allowClear
              />
            </Col>
          </Flex>

          <Flex gap="middle" vertical={false}>
            {books.map((book) => (
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={<img alt="example" src={bookimg} />}
              >
                <Meta title={book.title} description={book.author} />
              </Card>
            ))}
          </Flex>
        </Flex>
      </Row>
    </MainLayout>
  );
}
