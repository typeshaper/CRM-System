import { Layout, Menu, Typography } from "antd";
import { UserOutlined, FileDoneOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router";
import { type CSSProperties } from "react";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";

const layoutStyle: CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  display: "flex",
};

const contentStyle: CSSProperties = {
  width: "75ch",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  padding: "1rem 2rem",
};

const siderStyle: CSSProperties = {
  backgroundColor: "#F1F1F1",
  border: "none",
};

const headerStyle: CSSProperties = {
  padding: "1rem",
  color: "#A1A1A1",
  fontSize: "22px",
};

const AppLayout = () => {
  const { Content, Sider } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  const location = useLocation();
  const isRootURL = location.pathname.match(/\/app\/?/g);
  const menuItems: ItemType<MenuItemType>[] = [
    {
      key: "/app/tasks",
      label: "Tasks",
      icon: <FileDoneOutlined />,
    },
    {
      key: "/app/profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
  ];

  return (
    <Layout style={layoutStyle}>
      <Sider
        width={250}
        style={siderStyle}
      >
        <Title style={headerStyle}>To-Do List!</Title>
        <Menu
          style={siderStyle}
          defaultSelectedKeys={[isRootURL ? "/app/tasks" : location.pathname]}
          onClick={(info) => navigate(info.key)}
          items={menuItems}
        />
      </Sider>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
