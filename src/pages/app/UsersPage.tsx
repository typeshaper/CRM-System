import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import { getUsersList } from "../../api/user";
import { AxiosError } from "axios";
import useErrorMessage from "../../hooks/useErrorMessage";
import { Tag, Table, type TableProps, Space } from "antd";
import type { PresetColorKey } from "antd/es/theme/internal";
import { formatDateFromIsoString } from "../../utility/date";

const UsersPage = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const showError = useErrorMessage();

  const columns: TableProps<User>["columns"] = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Registration date",
      dataIndex: "date",
      key: "date",
      render: (_, user) => <p>{formatDateFromIsoString(user.date)}</p>,
    },
    {
      title: "Is blocked",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (_, user) => <p>{user.isBlocked ? "+" : "-"}</p>,
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
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
      <Table
        dataSource={usersList}
        columns={columns}
        size="middle"
      />
    </>
  );
};

export default UsersPage;
