import { type CSSProperties } from "react";
import { Outlet } from "react-router";
import { Layout, Menu, Typography } from "antd";
import { UserOutlined, FileDoneOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";

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

const RootLayoutPage = () => {
  const { Content, Sider } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const locationName = location.pathname.slice(1);

  return (
    <Layout style={layoutStyle}>
      <Sider
        width={250}
        style={siderStyle}
      >
        <Typography.Title style={headerStyle}>To-Do List!</Typography.Title>
        <Menu
          style={siderStyle}
          defaultSelectedKeys={[locationName]}
          items={[
            {
              key: "tasks",
              label: "Tasks",
              icon: <FileDoneOutlined />,
              onClick: () => navigate("/tasks"),
            },
            {
              key: "profile",
              label: "Profile",
              icon: <UserOutlined />,

              onClick: () => navigate("/profile"),
            },
          ]}
        />
      </Sider>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default RootLayoutPage;
