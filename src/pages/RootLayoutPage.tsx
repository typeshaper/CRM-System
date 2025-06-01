import { type CSSProperties, type ReactNode } from "react";
import { Outlet } from "react-router";
import { Layout, Menu } from "antd";
import { UserOutlined, FileDoneOutlined } from "@ant-design/icons";

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
  padding: "1rem 0",
  backgroundColor: "#FFF",
  border: "none",
};

const RootLayoutPage = () => {
  const { Content, Sider } = Layout;

  return (
    <Layout style={layoutStyle}>
      <Sider
        width={250}
        style={siderStyle}
      >
        <Menu
          style={siderStyle}
          items={[
            { key: "tasks", label: "Tasks", icon: <FileDoneOutlined /> },
            { key: "profile", label: "Profile", icon: <UserOutlined /> },
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
