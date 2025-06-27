import {
  FileDoneOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { authActions } from "../store/auth";
import { useEffect, useState } from "react";
import authService from "../services/authService";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Typography } from "antd";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { type CSSProperties } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import useErrorMessage from "../hooks/useErrorMessage";
import { refreshSession } from "../api/auth";
import type { RootState } from "../store";

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
    icon: <InfoCircleOutlined />,
  },
  {
    key: "/app/users",
    label: "Users",
    icon: <UserOutlined />,
  },
];

const AppLayout = () => {
  const { Content, Sider } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  const location = useLocation();
  const isRootURL = location.pathname.match(/\/app\/?$/g);
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem("refreshToken");
  const showError = useErrorMessage();
  const [isWaitingAuth, setIsWaitingAuth] = useState<boolean>(true);
  const isAuth = useSelector<RootState>((state) => state.isAuthenticated);

  useEffect(() => {
    (async () => {
      if (refreshToken && !isAuth) {
        try {
          const newTokens = await refreshSession({ refreshToken });
          authService.setAccessToken(newTokens.accessToken);
          dispatch(authActions.login());
          localStorage.setItem("refreshToken", newTokens.refreshToken);
          setIsWaitingAuth(false);
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.status === 401) {
              localStorage.removeItem("refreshToken");
              dispatch(authActions.logout());
              navigate("/auth");
              showError(error);
              setIsWaitingAuth(false);
            }
          }
        }
      }
    })();
  }, []);

  const content = (
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

  return isWaitingAuth ? <></> : content;
};

export default AppLayout;
