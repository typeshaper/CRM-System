import { FileDoneOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { type CSSProperties } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshSession } from "../api/auth";
import type { RootState } from "../store";
import { authActions } from "../store/auth";
import useErrorMessage from "../hooks/useErrorMessage";

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

const AppLayout = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.accessToken);
  const refreshToken = localStorage.getItem("refreshToken");
  const { Content, Sider } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  const location = useLocation();
  const isRootURL = location.pathname.match(/\/app\/?$/g);
  const showError = useErrorMessage();

  useEffect(() => {
    (async () => {
      if (!accessToken && refreshToken) {
        try {
          const newTokens = await refreshSession({ refreshToken });
          dispatch(authActions.setAccessToken(newTokens.accessToken));
          localStorage.setItem("refreshToken", newTokens.refreshToken);
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.status === 401) {
              localStorage.removeItem("refreshToken");
              navigate("/auth");
              showError(error);
            }
          }
        }
      }
    })();
  }, []);

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
