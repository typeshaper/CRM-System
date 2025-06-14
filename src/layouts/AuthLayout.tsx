import { Image, Flex } from "antd";
import { Outlet } from "react-router";
import illustration from "../assets/auth-illustration.png";
import { type CSSProperties } from "react";

const flexStyle: CSSProperties = {
  padding: "1rem",
  height: "100vh",
  display: "flex",
};

const imageStyle: CSSProperties = {
  borderTopLeftRadius: "16px",
  borderBottomLeftRadius: "16px",
  flex: 4,
  maxHeight: "100%",
};

const authItemStyle: CSSProperties = {
  flex: 3,
};

const AuthLayout = () => {
  return (
    <Flex
      style={flexStyle}
      gap={10}
      justify="space-between"
    >
      <Image
        style={imageStyle}
        preview={false}
        src={illustration}
      />
      <Flex style={authItemStyle}>
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default AuthLayout;
