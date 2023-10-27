import { Button, Form, Input, Modal, Space } from 'antd';
import React, { useEffect } from 'react';
import { ADD } from '../../utils/config';
import SubmitButton from '../SubmitButton';
import { createNewUser } from '../../services/user.service';

export default function UserModal({ state, onCancel, setState, getUsers }) {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(state);
    form.resetFields();
  }, [state]);
  const handleSubmit = (values) => {
    setState({ ...state, loading: true });

    console.log(values);

    if (state.action === ADD) {
      setState({
        action: ADD,
        loading: false,
        editBook: null,
        open: false,
      });
      createNewUser({
        ...values,
      }).then((res) => {
        getUsers();
        setState({
          action: ADD,
          loading: false,
          editBook: null,
          open: false,
        });
      });
    }
  };
  return (
    <Modal
      title={'Add New User'}
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
