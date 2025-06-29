import { Flex, Image } from "antd";
import { type CSSProperties } from "react";
import { Outlet } from "react-router";
import illustration from "../assets/auth-illustration.png";

const flexStyle: CSSProperties = {
  padding: "0.5rem",
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
  flex: "3 1 300px",
};

const AuthLayout = () => {
  return (
    <Flex style={flexStyle}>
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
