import React, { useEffect, useState } from "react";
import { Button, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import ShoppingCartOutlined from "@ant-design/icons";
const { Item } = Menu;
function Header() {
  const [path, setPath] = useState("/");

  const token = localStorage.getItem("token");

  const nevigate = useNavigate();
  useEffect(() => {
    console.log(window.location.pathname);
    setPath(window.location.pathname);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token", null);
    localStorage.removeItem("user", null);
    nevigate("/");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          alignItems: "center",
          padding: "10px",
          width: "100%",
        }}
        className="header"
      >
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[path]}
          selectedKeys={[path]}
          style={{
            width: "100%",
            justifyContent: "end",
          }}
          className="header"
        >
          {token ? (
            <>
              <Item
                // icon={<ShoppingCartOutlined />}
                className="menuitemparent"
                key="/category"
              >
                <Link className="menuitem" to="/category">
                  Category
                </Link>
              </Item>

              <Item
                // icon={<ShoppingCartOutlined />}
                className="menuitemparent"
                key="/cart"
              >
                <Link className="menuitem" to="/cart">
                  Cart
                </Link>
              </Item>
            </>
          ) : (
            <>
              <Item className="menuitemparent" key="/">
                <Link className="menuitem" to="/">
                  Home
                </Link>
              </Item>

              <Item className="menuitemparent" key="/about">
                <Link className="menuitem" to="/about">
                  About
                </Link>
              </Item>
              <Item className="menuitemparent" key="/pricing">
                <Link className="menuitem" to="/pricing">
                  Pricing
                </Link>
              </Item>

              <Item className="menuitemparent" key="/contactus">
                <Link className="menuitem" to="/contactus">
                  Contact US
                </Link>
              </Item>
            </>
          )}
        </Menu>
        {token ? (
          <Button
            style={{
              height: "40px",
              width: "11  0px",
            }}
            className="button"
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            LogOut
          </Button>
        ) : window.location.pathname !== "/login" ? (
          <Link to="/login">
            <Button
              className="button"
              style={{
                height: "40px",
                width: "110px",
              }}
              icon={<LoginOutlined />}
            >
              Login
            </Button>
          </Link>
        ) : (
          <Link to="/register">
            <Button
              style={{
                height: "40px",
                width: "110px",
              }}
              className="button"
              type="primary"
              icon={<LoginOutlined />}
            >
              Register
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}

export default Header;
