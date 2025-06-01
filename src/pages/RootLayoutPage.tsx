import { type CSSProperties } from "react";
import { Outlet } from "react-router";
import { Layout, Menu } from "antd";
import { UserOutlined, FileDoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  return (
    <Layout style={layoutStyle}>
      <Sider
        width={250}
        style={siderStyle}
      >
        <Menu
          style={siderStyle}
          defaultSelectedKeys={["tasks"]}
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
