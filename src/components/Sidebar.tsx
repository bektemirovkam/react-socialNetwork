import React, { FC } from "react";
import { Link } from "react-router-dom";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";

const { SubMenu } = Menu;
const { Sider } = Layout;

type SidebarType = {
  isAuth: boolean;
  logout: () => void;
};

const Sidebar: FC<SidebarType> = ({ isAuth, logout }) => {
  const handleLogout = () => {
    logout();
  };
  return (
    <Sider width={200} className="site-layout-background">
      <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
        <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
          <Menu.Item key="1">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="2">
            {isAuth ? (
              <Button onClick={handleLogout} type="link" danger>
                Log Out
              </Button>
            ) : (
              <Link to="/login" className="sidebar__link">
                Login
              </Link>
            )}
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Friends">
          <Menu.Item key="3">
            <Link to="/friends">Friends</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
