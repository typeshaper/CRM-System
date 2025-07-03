import { Typography, Flex, List, Skeleton, Button, Input, Form } from "antd";
import useErrorMessage from "../../hooks/useErrorMessage";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { getUserById, updateUserData } from "../../api/admin";
import { useState } from "react";
import type { Profile, ProfileRequest } from "../../types/user";
import { AxiosError } from "axios";

const ProfilePage = () => {
  const { Title, Text } = Typography;
  const params = useParams();
  const [userData, setUserData] = useState<Profile>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const showError = useErrorMessage();
  const [profileForm] = Form.useForm();
  const navigate = useNavigate();

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleSave = async (formData: ProfileRequest) => {
    console.log(formData);
    try {
      if (params.userId) {
        const newUserData = await updateUserData(formData, +params.userId);
        setIsEditing(false);
        setUserData(newUserData);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showError(error);
        setIsEditing(false);
      }
    }
  };

  const handleGoBack = () => {
    navigate("..", { relative: "path" });
  };

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
          gap="1rem"
          align="flex-end"
        >
          {!isEditing && (
            <>
              <List
                size="large"
                bordered
              >
                <List.Item>
                  <Text>
                    <span style={{ fontWeight: "bold" }}>Username: </span>
                    {userData?.username}
                  </Text>
                </List.Item>
                <List.Item>
                  <Text>
                    <span style={{ fontWeight: "bold" }}>Email: </span>
                    {userData?.email}
                  </Text>
                </List.Item>
                <List.Item>
                  <Text>
                    <span style={{ fontWeight: "bold" }}>Phone number: </span>
                    {userData?.phoneNumber || "-"}
                  </Text>
                </List.Item>
              </List>
              <Button
                onClick={handleEditButton}
                type="primary"
                style={{ width: "7ch" }}
              >
                Edit
              </Button>
            </>
          )}

          {isEditing && (
            <>
              <List
                size="large"
                bordered
              >
                <Form
                  onFinish={(values: ProfileRequest) => handleSave(values)}
                  form={profileForm}
                  initialValues={{
                    username: userData?.username,
                    email: userData?.email,
                    phoneNumber: userData?.phoneNumber,
                  }}
                >
                  <Form.Item name="username">
                    <Input />
                  </Form.Item>

                  <Form.Item name="email">
                    <Input />
                  </Form.Item>

                  <Form.Item name="phoneNumber">
                    <Input />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      htmlType="submit"
                      name="save"
                      color="green"
                      variant="solid"
                      style={{ width: "7ch" }}
                    >
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              </List>
            </>
          )}
        </Flex>
      </Skeleton>
      <Button onClick={handleGoBack}>Go back</Button>
    </>
  );
};

export default ProfilePage;
