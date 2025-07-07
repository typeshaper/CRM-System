import {
  FileDoneOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useState, type CSSProperties } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const layoutStyle: CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  display: "flex",
};

const contentStyle: CSSProperties = {
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

  const hasPermission = useSelector<RootState, boolean>(
    (state) => (state.auth.isAdmin || state.auth.isModerator) ?? false
  );

  const userMenuItems: ItemType<MenuItemType>[] = [
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
  ];

  const adminMenuItems: ItemType<MenuItemType>[] = [
    ...userMenuItems,
    {
      key: "/app/users",
      label: "Users",
      icon: <UserOutlined />,
    },
  ];

  return (
    <Layout style={layoutStyle}>
      <Sider
        theme="light"
        width={250}
        style={siderStyle}
        collapsible
        collapsed={isCollapsed}
        onCollapse={handleCollapse}
        breakpoint="lg"
      >
        <Title style={headerStyle}>{headerText}</Title>
        <Menu
          style={siderStyle}
          defaultSelectedKeys={[isRootURL ? "/app/tasks" : location.pathname]}
          onClick={(info) => navigate(info.key)}
          items={hasPermission ? adminMenuItems : userMenuItems}
        />
      </Sider>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
