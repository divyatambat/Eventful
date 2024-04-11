import React, { useState } from "react";
import { HomeOutlined, LogoutOutlined, BookOutlined } from "@ant-design/icons";
import { Menu, message } from "antd";
import type { GetProp, MenuProps } from "antd";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
// import ListBookings from "./booking/ListBookings";
import "../../shared/UserSidebar.css"
import ListBooking from "../../../bookings/components/UserBookings";

type MenuTheme = GetProp<MenuProps, "theme">;
type MenuItem = GetProp<MenuProps, "items">[number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id"); 
};

const items: MenuItem[] = [
  getItem("My Bookings", "1", <BookOutlined />),
  getItem(
    "Home",
    "link",
    <Link to="/" target="_blank" rel="noopener noreferrer">
      <HomeOutlined />
    </Link>
  ),
  getItem("Logout", "logout", <LogoutOutlined />, undefined, handleLogout),
];

const UserSidebar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("1");
  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleMenuClick = (menu: any) => {
    setSelectedMenuItem(menu.key);
    switch (menu.key) {
      case "1":
        message.info("My Bookings");
        break;
      case "link":
        message.info("Home");
        break;
      case "logout":
        toast.dark("Logged out successfully!");
        navigate("/");
        break;
      default:
        break;
    }
  };

  const renderComponent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <ListBooking />; 
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}>
        <Menu
          style={{ width: collapsed ? "80px" : "200px" }}
          defaultSelectedKeys={[selectedMenuItem]}
          defaultOpenKeys={["sub1"]}
          mode={mode}
          theme={theme}
          items={items}
          onClick={handleMenuClick}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
        />
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default UserSidebar;
