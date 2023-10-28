import { Button, Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <Link to={'/books'} style={{ padding: '0px 3px' }}>
          Books
        </Link>
        <Link to={'/users'} style={{ padding: '0px 3px' }}>
          Users
        </Link>
        <div style={{ float: 'right', color: '#fff' }}>
          <Button style={{ marginLeft: 10 }}>Login</Button>
        </div>
      </Header>
      <Content
        style={{
          padding: '10px 50px',
        }}
      >
        {children}
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Design ©2023 Created by Jananthan
      </Footer>
    </Layout>
  );
}
