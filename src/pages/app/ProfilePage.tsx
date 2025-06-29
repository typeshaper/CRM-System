import { Typography, Flex, List, Skeleton, Button } from "antd";
import { getCurrentUserData } from "../../api/user";
import { useEffect, useState } from "react";
import type { Profile } from "../../types/user";
import useErrorMessage from "../../hooks/useErrorMessage";
import { AxiosError } from "axios";
import { logout } from "../../api/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import authService from "../../services/authService";

const ProfilePage = () => {
  const { Title, Text } = Typography;
  const [userData, setUserData] = useState<Profile>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const dispatch = useDispatch();
  const accessToken = authService.getAccessToken();

  const showError = useErrorMessage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      if (accessToken !== "") {
        await logout(accessToken);
        localStorage.removeItem("refreshToken");
        authService.clearAccessToken();
        dispatch(authActions.logout());
        setIsLoggingOut(false);
        navigate("/auth");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showError(error);
        setIsLoggingOut(false);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        if (accessToken !== "") {
          const response = await getCurrentUserData();
          setUserData(response);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          showError(error);
        }
      }
    })();
  }, []);
  console.log(userData);

  return (
    <>
      <Skeleton
        active
        loading={isLoading}
      >
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
      </Skeleton>
    </>
  );
};

export default ProfilePage;
