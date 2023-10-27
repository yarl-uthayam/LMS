import { Button, Layout } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, ADMIN } from '../utils/config';
import { parseJwt } from '../utils/jwt';
const { Header, Content, Footer } = Layout;

export default function MainLayout({ children }) {
  let navigate = useNavigate();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const { role } = parseJwt(token);
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate('/');
  };
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <Link to={'/books'} style={{ padding: '0px 3px' }}>
          Books
        </Link>
        {/* <Link to={'/users'} style={{ padding: '0px 3px' }}>
          Users
        </Link> */}
        <div style={{ float: 'right', color: '#fff' }}>
          <Button style={{ marginLeft: 10 }}>Login</Button>
          {/* <Button style={{ marginLeft: 10 }} onClick={() => logout()}>
            Logout
          </Button> */}
        </div>
      </Header>
      <Content
        style={{
          padding: '10px 50px',
        }}
      >
        {children}
        {/* <div className="site-layout-content"></div> */}
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
