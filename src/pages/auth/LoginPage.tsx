import {
  Flex,
  Image,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  Anchor,
} from "antd";
import icon from "../../assets/auth-icon.png";
import type { CSSProperties } from "react";

const outerFlexContainerStyle: CSSProperties = {
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
};

const innerFlexContainerStyle: CSSProperties = {
  width: "70%",
  height: "500px",
  marginTop: "30%",
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

        <Form layout="vertical">
          <Form.Item label="Email">
            <Input
              style={inputStyle}
              size="large"
              placeholder="mail@abc.com"
              type="p"
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password
              style={inputStyle}
              size="large"
              placeholder="*******************"
            />
          </Form.Item>
          <Flex
            align="center"
            justify="space-between"
            style={{ paddingBottom: "1rem" }}
          >
            <Checkbox>Remember me</Checkbox>
            <a
              style={{ color: "#7F275B" }}
              href=""
            >
              Forgot password?
            </a>
          </Flex>
          <Form.Item>
            <Button style={loginButtonStyle}>Login</Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
