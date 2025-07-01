import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import { getUsersList } from "../../api/user";
import { AxiosError } from "axios";
import useErrorMessage from "../../hooks/useErrorMessage";
import { Tag, Table, type TableProps, Space } from "antd";
import type { PresetColorKey } from "antd/es/theme/internal";
import { formatDateFromIsoString } from "../../utility/date";
import { PhoneOutlined, MailOutlined, SearchOutlined } from "@ant-design/icons";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Typography, Flex, Row, Col, Input } from "antd";

const UsersPage = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const showError = useErrorMessage();
  const { Title } = Typography;

  const columns: TableProps<User>["columns"] = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, user) => (
        <Space
          direction="horizontal"
          size="small"
        >
          <MailOutlined />
          <p>{user.email}</p>
        </Space>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, user) => {
        const formattedPhone = parsePhoneNumberFromString(
          user.phoneNumber
        )?.formatInternational();
        return (
          <Space
            direction="horizontal"
            size="small"
          >
            {user.phoneNumber ? (
              <>
                <PhoneOutlined />
                <p>{formattedPhone}</p>
              </>
            ) : (
              <p>-</p>
            )}
          </Space>
        );
      },
      width: "18ch",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (_, user) => {
        return (
          <Space
            size="small"
            direction="horizontal"
          >
            {user.roles.map((role) => {
              let color: PresetColorKey;
              switch (role) {
                case "ADMIN":
                  color = "purple";
                  break;
                case "MODERATOR":
                  color = "orange";
                  break;
                case "USER":
                  color = "blue";
                  break;
              }

              return <Tag color={color}>{role}</Tag>;
            })}
          </Space>
        );
      },
    },
    {
      title: "Is blocked",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (_, user) => <p>{user.isBlocked ? "+" : "-"}</p>,
      width: "10ch",
    },
    {
      title: "Registration date",
      dataIndex: "date",
      key: "date",
      render: (_, user) => (
        <p style={{ maxWidth: "10ch" }}>{formatDateFromIsoString(user.date)}</p>
      ),
      width: "15ch",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const newUsersList = await getUsersList();
        setUsersList(newUsersList.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          showError(error);
        }
      }
    })();
  }, []);

  return (
    <>
      <Title>Users</Title>
      <Flex
        vertical
        style={{
          border: "1px solid #E4E4E4",
          borderRadius: 10,
          padding: "2rem 1.5rem 0 1.5rem",
        }}
      >
        <Row style={{ paddingBottom: "1rem" }}>
          <Col span={14}>
            <Title level={3}>Users</Title>
          </Col>
          <Col span={10}>
            <Flex gap="1rem">
              <Input
                prefix={<SearchOutlined />}
                size="large"
                placeholder="Search by name or email"
              />
              <p
                style={{
                  border: "2px solid black",
                  borderRadius: 6,
                  padding: ".5rem 1rem",
                }}
              >
                Filter
              </p>
            </Flex>
          </Col>
        </Row>
        <Table
          style={{ minWidth: "100%" }}
          dataSource={usersList}
          columns={columns}
          size="middle"
          scroll={{ x: "max-content" }}
        />
      </Flex>
    </>
  );
};

export default UsersPage;
