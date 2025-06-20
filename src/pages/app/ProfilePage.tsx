import { Typography, List } from "antd";

const ProfilePage = () => {
  const { Title, Text } = Typography;
  return (
    <>
      <Title>Your info</Title>
      <List bordered>
        <List.Item>
          <Text>Username: dimasasas</Text>
        </List.Item>

        <List.Item>
          <Text>Email: bobikchmobik@mama.cock</Text>
        </List.Item>

        <List.Item>
          <Text>Phone: 8777777777777</Text>
        </List.Item>
      </List>
    </>
  );
};

export default ProfilePage;
