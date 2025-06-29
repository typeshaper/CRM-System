import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import { getUsersList } from "../../api/user";
import { AxiosError } from "axios";
import useErrorMessage from "../../hooks/useErrorMessage";
import { Tag, Table, type TableProps, Space } from "antd";
import type { PresetColorKey } from "antd/es/theme/internal";
import { formatDateFromIsoString } from "../../utility/date";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Typography } from "antd";

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
      <Table
        style={{ minWidth: "100%" }}
        dataSource={usersList}
        columns={columns}
        size="middle"
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default UsersPage;
