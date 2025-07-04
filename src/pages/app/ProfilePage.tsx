import * as EmailValidator from "email-validator";
import {
  Typography,
  Flex,
  List,
  Skeleton,
  Button,
  Input,
  Form,
  Space,
} from "antd";
import useErrorMessage from "../../hooks/useErrorMessage";
import { useNavigate, useParams } from "react-router";
import { useEffect, type CSSProperties } from "react";
import { getUserById, updateUserData } from "../../api/admin";
import { useState } from "react";
import type { Profile, ProfileRequest } from "../../types/user";
import { AxiosError } from "axios";
import { diff } from "deep-object-diff";
import {
  emailValidationRules,
  phoneNumberValidationRules,
  usernameValidationRules,
} from "../../utility/validation";
import { isPossiblePhoneNumber } from "libphonenumber-js";

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
    console.log(userData);

    try {
      if (params.userId && userData) {
        const prevUserData = {
          username: userData.username,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
        };

        const updatedUserData = diff(prevUserData, formData);
        console.log(updatedUserData);

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
          <Form
            initialValues={{
              email: userData?.email,
              phoneNumber: userData?.phoneNumber,
              username: userData?.username,
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
                    {!isEditing && userData?.username}
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
                    {!isEditing && userData?.email}
                  </Space>
                </List.Item>
                <List.Item>
                  <Space
                    style={{ height: "3rem" }}
                    direction="horizontal"
                  >
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Phone number: </span>
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
                    {!isEditing && (userData?.phoneNumber || "-")}
                  </Space>
                </List.Item>
              </List>

              {!isEditing && <Button onClick={handleEditButton}>Edit</Button>}
              {isEditing && <Button htmlType="submit">Save</Button>}
            </Flex>
          </Form>
        </Flex>
      </Skeleton>
      <Button onClick={handleGoBack}>← Go back</Button>
    </>
  );
};

export default ProfilePage;
