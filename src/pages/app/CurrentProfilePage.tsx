import { Typography, Flex, List, Button } from "antd";
import { useState } from "react";
import type { Profile } from "../../types/user";
import useErrorMessage from "../../hooks/useErrorMessage";
import { AxiosError } from "axios";
import { logout } from "../../api/auth";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import authService from "../../services/authService";
import type { RootState } from "../../store";

const CurrentProfilePage = () => {
  const { Title, Text } = Typography;
  const userData = useSelector<RootState, Profile | undefined>(
    (state) => state.auth.userData
  );
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const dispatch = useDispatch();

  const showError = useErrorMessage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      localStorage.removeItem("refreshToken");
      authService.clearAccessToken();
      dispatch(authActions.logout());
      setIsLoggingOut(false);
      navigate("/auth");
    } catch (error) {
      if (error instanceof AxiosError) {
        showError(error);
        setIsLoggingOut(false);
      }
    }
  };

  return (
    <>
      <Title>Your info</Title>
      <Flex
        vertical
        style={{ height: "100%" }}
        justify="space-between"
      >
        <List bordered>
          <List.Item>
            <Text>Username: {userData?.username}</Text>
          </List.Item>
          <List.Item>
            <Text>Email: {userData?.email}</Text>
          </List.Item>
          <List.Item>
            <Text>Phone number: {userData?.phoneNumber || "-"}</Text>
          </List.Item>
        </List>
        <Button
          onClick={handleLogout}
          style={{ alignSelf: "start" }}
          danger
          disabled={isLoggingOut}
        >
          Logout
        </Button>
      </Flex>
    </>
  );
};

export default CurrentProfilePage;
