import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
const location = useLocation();
return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <div className="logo" style={{ color: 'white', fontSize: '25px', fontWeight: 'bold', marginRight : '40px' }}>
            SMART ERD
        </div>
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, fontSize: '17px' }} defaultSelectedKeys={['1']}
          selectedKeys={[location.pathname]}>
          <Menu.Item key="/main/erd">
            <Link to="/main/erd">ERD Drawer</Link>
          </Menu.Item>
          <Menu.Item key="/main/userlist">
            <Link to="/main/userlist">User List</Link>
          </Menu.Item>
          <Menu.Item key="/" style={{ marginLeft: 'auto' }}>
            <Link to="/">Logout</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '10px' }}>
        <Outlet/>
      </Content>
    </Layout>
  );
};

export default MainLayout;
