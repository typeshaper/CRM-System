import { Typography, List, Skeleton } from "antd";
import { getCurrentUserData } from "../../api/user";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { Profile } from "../../types/user";
import type { RootState } from "../../store";
import useErrorMessage from "../../hooks/useErrorMessage";
import { AxiosError } from "axios";

const ProfilePage = () => {
  const { Title, Text } = Typography;
  const [userData, setUserData] = useState<Profile>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = useSelector<RootState, string>(
    (state) => state.accessToken
  );
  const showError = useErrorMessage();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        if (accessToken !== "") {
          const response = await getCurrentUserData(accessToken);
          setUserData(response);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          showError(error);
        }
      }
    })();
  }, [accessToken]);
  return (
    <>
      <Skeleton
        active
        loading={isLoading}
      >
        <Title>Your info</Title>
        <List bordered>
          <List.Item>
            <Text>Username: {userData?.username ?? "unknown"}</Text>
          </List.Item>

          <List.Item>
            <Text>Email: {userData?.email ?? "unknown"}</Text>
          </List.Item>

          <List.Item>
            <Text>Phone: {userData?.phoneNumber ?? "unknown"}</Text>
          </List.Item>
        </List>
      </Skeleton>
    </>
  );
};

export default ProfilePage;
