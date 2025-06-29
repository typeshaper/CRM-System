import {
  FileDoneOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Collapse, Layout, Menu, Typography } from "antd";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useState, type CSSProperties } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

const layoutStyle: CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  display: "flex",
};

const contentStyle: CSSProperties = {
  // width: "75ch",
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

const menuItems: ItemType<MenuItemType>[] = [
  {
    key: "/app/tasks",
    label: "Tasks",
    icon: <FileDoneOutlined />,
  },
  {
    key: "/app/profile",
    label: "Profile",
    icon: <InfoCircleOutlined />,
  },
  {
    key: "/app/users",
    label: "Users",
    icon: <UserOutlined />,
  },
];

const AppLayout = () => {
  const [headerText, setHeaderText] = useState<string>("To-Do List!");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const { Content, Sider } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  const location = useLocation();
  const isRootURL = location.pathname.match(/\/app\/?$/g);
  const handleCollapse = () => {
    if (isCollapsed) {
      setHeaderText("To-Do List!");
      setIsCollapsed(false);
    } else {
      setHeaderText("To Do List!");
      setIsCollapsed(true);
    }
  };

  return (
    <Layout style={layoutStyle}>
      <Sider
        theme="light"
        width={250}
        style={siderStyle}
        collapsible
        collapsed={isCollapsed}
        onCollapse={handleCollapse}
      >
        <Title style={headerStyle}>{headerText}</Title>
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
