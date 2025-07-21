import {
  Button,
  Flex,
  Form,
  Input,
  List,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { hasEmptyObject, getObjectDiff } from "../../utility/helper";
import { AxiosError } from "axios";
import * as EmailValidator from "email-validator";
import { isPossiblePhoneNumber } from "libphonenumber-js";
import { useEffect, useState, type CSSProperties } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import { getUserById, updateUserData } from "../../api/admin";
import useErrorMessage from "../../hooks/useErrorMessage";
import type { RootState } from "../../store";
import type { Profile, ProfileRequest } from "../../types/user";
import {
  emailValidationRules,
  phoneNumberValidationRules,
  usernameValidationRules,
} from "../../utility/validation";

const UserPage = () => {
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
    try {
      if (params.userId && userData) {
        const prevUserData: ProfileRequest = {
          username: userData.username,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
        };

        const updatedUserData = getObjectDiff(prevUserData, formData);

        if (hasEmptyObject(updatedUserData)) {
          setIsEditing(false);
          return;
        }

        const newUserData = await updateUserData(
          updatedUserData,
          +params.userId
        );
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

  const formItemStyle: CSSProperties = {
    height: 0,
    width: "100%",
  };

  const hasPermission = useSelector<RootState, boolean>(
    (state) => (state.auth.isAdmin || state.auth.isModerator) ?? false
  );

  if (!hasPermission) {
    return (
      <Navigate
        to="/app"
        replace
      />
    );
  }

  return (
    <>
      <Title>Profile info</Title>
      <Skeleton
        loading={isLoading}
        active
      >
        {userData ? (
          <Flex
            vertical
            style={{ height: "100%" }}
            gap="1rem"
            align="flex-end"
          >
            <Form
              initialValues={{
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                username: userData.username,
              }}
              form={profileForm}
              onFinish={handleSave}
            >
              <Flex
                gap="2rem"
                vertical
                align="flex-start"
              >
                <List
                  size="large"
                  style={{ width: "50ch" }}
                >
                  <List.Item>
                    <Space
                      style={{ height: "3rem" }}
                      direction="horizontal"
                    >
                      <Text>
                        <span style={{ fontWeight: "bold" }}>Username: </span>
                      </Text>

                      {isEditing && (
                        <Form.Item
                          name="username"
                          style={formItemStyle}
                          rules={[{ ...usernameValidationRules }]}
                        >
                          <Input style={{ width: " 100%" }} />
                        </Form.Item>
                      )}
                      {!isEditing && userData.username}
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space
                      style={{ height: "3rem" }}
                      direction="horizontal"
                    >
                      <Text>
                        <span style={{ fontWeight: "bold" }}>Email: </span>
                      </Text>

                      {isEditing && (
                        <Form.Item
                          name="email"
                          style={formItemStyle}
                          rules={[
                            {
                              ...emailValidationRules,

                              validator(_, value) {
                                if (EmailValidator.validate(value)) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error(emailValidationRules.message)
                                );
                              },
                            },
                          ]}
                        >
                          <Input style={{ width: " 100%" }} />
                        </Form.Item>
                      )}
                      {!isEditing && userData.email}
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space
                      style={{ height: "3rem" }}
                      direction="horizontal"
                    >
                      <Text>
                        <span style={{ fontWeight: "bold" }}>
                          Phone number:{" "}
                        </span>
                      </Text>

                      {isEditing && (
                        <Form.Item
                          name="phoneNumber"
                          style={formItemStyle}
                          rules={[
                            {
                              ...phoneNumberValidationRules,

                              validator(_, value) {
                                if (
                                  !value ||
                                  isPossiblePhoneNumber(value, "RU")
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error(phoneNumberValidationRules.message)
                                );
                              },
                            },
                          ]}
                        >
                          <Input style={{ width: " 100%" }} />
                        </Form.Item>
                      )}
                      {!isEditing && (userData.phoneNumber || "-")}
                    </Space>
                  </List.Item>
                </List>

                {!isEditing && (
                  <Button
                    variant="solid"
                    color="blue"
                    onClick={handleEditButton}
                  >
                    Edit
                  </Button>
                )}
                {isEditing && (
                  <Button
                    variant="solid"
                    color="green"
                    htmlType="submit"
                  >
                    Save
                  </Button>
                )}
              </Flex>
            </Form>
          </Flex>
        ) : (
          <Title level={2}>User not found</Title>
        )}
      </Skeleton>
      <Button
        variant="solid"
        color="default"
        onClick={handleGoBack}
      >
        ← Back
      </Button>
    </>
  );
};

export default UserPage;
