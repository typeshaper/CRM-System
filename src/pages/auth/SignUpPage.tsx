import { Flex, Image, Typography, Form, Input, Button } from "antd";
import icon from "../../assets/auth-icon.png";
import { useState, type CSSProperties } from "react";
import { signup } from "../../api/auth";
import type { UserRegistration } from "../../types/auth";
import useErrorMessage from "../../hooks/useErrorMessage";
import { AxiosError } from "axios";
import { useNavigate, Link } from "react-router";
import {
  emailValidationRules,
  loginValidationRules,
  passwordValidationRules,
  phoneNumberValidationRules,
  usernameValidationRules,
} from "../../utility/validation";
import { isPossiblePhoneNumber } from "libphonenumber-js";
import * as EmailValidator from "email-validator";
import useApp from "antd/es/app/useApp";
import { formatPhoneNumber } from "../../utility/formatting";

const outerFlexContainerStyle: CSSProperties = {
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
};

const innerFlexContainerStyle: CSSProperties = {
  width: "70%",
  height: "100%",
  padding: "10rem 0 4rem 0",
  flexDirection: "column",
  justifyContent: "center",
};

const textWrapperStyle: CSSProperties = {
  flexDirection: "column",
  padding: "1rem 2rem",
};

const loginButtonStyle: CSSProperties = {
  color: "#FFF",
  backgroundColor: "#7F275B",
  height: "50px",
  width: "100%",
  fontWeight: 800,
  fontSize: 22,
};

const inputStyle: CSSProperties = {
  height: "45px",
};

const SignUpPage = () => {
  const { Title } = Typography;
  const showError = useErrorMessage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const app = useApp();
  const notification = app.notification;

  const handleSignupButton = async (userData: UserRegistration) => {
    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(userData.phoneNumber);
      if (formattedPhone) {
        userData.phoneNumber = formattedPhone;
      }
      await signup(userData);
      notification.success({
        message: "Account is created successfully!",
        placement: "bottomRight",
      });
      navigate("/auth/login");
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        showError(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <Flex style={outerFlexContainerStyle}>
      <Flex style={innerFlexContainerStyle}>
        <Image
          src={icon}
          height={72}
          width={72}
          preview={false}
          style={{ alignSelf: "start" }}
        />

        <Flex style={textWrapperStyle}>
          <Title
            style={{ marginBottom: 0 }}
            level={2}
          >
            Create your new account
          </Title>
        </Flex>

        <Form
          layout="vertical"
          onFinish={(values: UserRegistration) => handleSignupButton(values)}
        >
          <Form.Item
            name="userName"
            label="Username"
            rules={[{ ...usernameValidationRules }]}
          >
            <Input
              style={inputStyle}
              size="large"
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="login"
            label="Login"
            rules={[{ ...loginValidationRules }]}
          >
            <Input
              style={inputStyle}
              size="large"
              placeholder="Login"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ ...passwordValidationRules }]}
          >
            <Input.Password
              style={inputStyle}
              size="large"
              placeholder="*************"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm password"
            rules={[
              { ...passwordValidationRules },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
            dependencies={["password"]}
          >
            <Input.Password
              style={inputStyle}
              size="large"
              placeholder="*************"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
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
            <Input
              style={inputStyle}
              size="large"
              placeholder="youremail@inbox.com"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[
              {
                ...phoneNumberValidationRules,

                validator(_, value) {
                  if (!value || isPossiblePhoneNumber(value, "RU")) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(phoneNumberValidationRules.message)
                  );
                },
              },
            ]}
          >
            <Input
              style={inputStyle}
              size="large"
              placeholder="+1 (123) 456-7890"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              style={loginButtonStyle}
              loading={isLoading}
            >
              Create account
            </Button>
          </Form.Item>
        </Form>
        <Flex
          justify="center"
          gap="1rem"
          style={{ marginTop: "auto", fontSize: "18px" }}
        >
          <p>Have an account already?</p>
          <Link
            to="/auth/login"
            style={{ color: "#7F275B" }}
          >
            Log In
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUpPage;
