import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Space } from 'antd';
import { ADD, EDIT } from '../../utils/config';
import { createBook, updateBook } from '../../services/book.service';
import SubmitButton from '../SubmitButton';

export default function BookModal({ state, onCancel, setState, getBooks }) {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(new Date(state.dateOfPublication));

    if (state.action === EDIT) {
      const { _id, dateOfPublication } = state.editBook;
      form.setFieldsValue({
        ...state.editBook,
        id: _id,
        dateOfPublication: new Date(dateOfPublication).toDateString(),
      });
    } else {
      form.resetFields();
    }
  }, [state]);

  const handleSubmit = (values) => {
    setState({ ...state, loading: true });

    console.log(values);

    if (state.action === ADD) {
      createBook({
        ...values,
      }).then((res) => {
        getBooks();
        setState({
          action: ADD,
          loading: false,
          editBook: null,
          open: false,
        });
      });
    } else {
      updateBook(
        {
          ...values,
        },
        form.getFieldValue('id')
      ).then((res) => {
        setState({
          action: ADD,
          loading: false,
          editBook: null,
          open: false,
        });
        getBooks();
      });
    }
  };
  return (
    <Modal
      title={state.action === EDIT ? 'Edit Book' : 'Add New Book'}
      open={state.open}
      footer={null}
      onCancel={onCancel}
      maskClosable={false}
    >
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item name="id" label="ID" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="uniqueId"
          label="UID"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="subject"
          label="Subject"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dateOfPublication"
          label="Date Of Publication"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item>
          <Space style={{ float: 'right' }}>
            <Button htmlType="reset">Reset</Button>
            <SubmitButton form={form} confirmLoading={state.loading} />
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
