import { Typography, Flex, List, Skeleton } from "antd";
import useErrorMessage from "../../hooks/useErrorMessage";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getUserById } from "../../api/admin";
import { useState } from "react";
import type { Profile } from "../../types/user";
import { AxiosError } from "axios";

const ProfilePage = () => {
  const { Title, Text } = Typography;
  const params = useParams();
  const [userData, setUserData] = useState<Profile>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const showError = useErrorMessage();

  useEffect(() => {
    (async () => {
      if (params.userId) {
        try {
          const fetchedData = await getUserById(+params.userId);
          setUserData(fetchedData);
          setIsLoading(false);
        } catch (error) {
          if (error instanceof AxiosError) {
            showError(error);
            setIsLoading(false);
          }
        }
      }
    })();
  }, [params.userId]);

  return (
    <>
      <Title>Profile info</Title>
      <Skeleton
        loading={isLoading}
        active
      >
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
        </Flex>
      </Skeleton>
    </>
  );
};

export default ProfilePage;
