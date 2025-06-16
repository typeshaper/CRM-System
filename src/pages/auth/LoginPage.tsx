import { Flex, Image, Typography, Form, Input, Button, Checkbox } from "antd";
import icon from "../../assets/auth-icon.png";
import { useState, type CSSProperties } from "react";
import { login } from "../../api/auth";
import type { AuthData } from "../../types/todo";
import useErrorMessage from "../../hooks/useErrorMessage";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

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

const LoginPage = () => {
  const { Title, Paragraph } = Typography;
  const showError = useErrorMessage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginButton = async (loginData: AuthData) => {
    setIsLoading(true);
    try {
      await login(loginData);
      navigate("/app");
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
            Login to your Account
          </Title>
          <Paragraph>See what is going on with your business</Paragraph>
        </Flex>

        <Form
          layout="vertical"
          onFinish={(values: AuthData) => handleLoginButton(values)}
        >
          <Form.Item
            name="login"
            label="Login"
            rules={[{ required: true, message: "Please enter your login" }]}
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
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              style={inputStyle}
              size="large"
              placeholder="*************"
            />
          </Form.Item>
          <Flex
            align="center"
            justify="space-between"
            style={{ paddingBottom: "1rem" }}
          >
            <Checkbox>Remember me</Checkbox>
            <a style={{ color: "#7F275B" }}>Forgot password?</a>
          </Flex>
          <Form.Item>
            <Button
              htmlType="submit"
              style={loginButtonStyle}
              loading={isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <Flex
          justify="center"
          gap="1rem"
          style={{ marginTop: "auto", fontSize: "18px" }}
        >
          <p>Not Registered Yet?</p>
          <a style={{ color: "#7F275B" }}>Create an account</a>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
