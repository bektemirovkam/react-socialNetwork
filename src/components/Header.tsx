import React, { FC } from "react";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { Button, Col, Layout, Menu, Row } from "antd";

type HeaderPropsType = {
  isAuth: boolean;
  logout: () => void;
  name: string;
};

const Header: FC<HeaderPropsType> = ({ isAuth, logout, name }) => {
  const handleLogout = () => {
    logout();
  };
  const { Header } = Layout;
  return (
    <Header className="header">
      <Row>
        <Col span={8}>
          <div className="logo">
            <Link to="/" className="header__logo">
              <img src={logo} alt="logotip" className="logo__img" />
            </Link>
          </div>
        </Col>
        <Col span={8} offset={2}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/friends">Friends</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/chat">Chat</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={4} offset={2}>
          {!isAuth ? (
            <Button type="primary" href="/login">
              Sign In
            </Button>
          ) : (
            <div>
              <Link to="/profile" className="header__name">
                {name}
              </Link>
              <Button onClick={handleLogout} type="link">
                Log Out
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Header>
  );
};

export default Header;
