import { useCallback, useEffect, useState } from "react";
import type { User, UserFilters, UsersMetaResponse } from "../../types/user";
import { getUsersList } from "../../api/admin.ts";
import { AxiosError } from "axios";
import useErrorMessage from "../../hooks/useErrorMessage";
import { Tag, Table, type TableProps, Space, Skeleton } from "antd";
import type { PresetColorKey } from "antd/es/theme/internal";
import { formatDateFromIsoString } from "../../utility/date";
import {
  PhoneOutlined,
  MailOutlined,
  SearchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Typography, Flex, Row, Col, Input } from "antd";
import debounce from "lodash.debounce";

const UsersPage = () => {
  const [usersList, setUsersList] = useState<UsersMetaResponse<User>>();
  const showError = useErrorMessage();
  const { Title } = Typography;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userFilters, setUserFilters] = useState<UserFilters>({});

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

  const fetchUsers = useCallback(
    debounce(async (queryParams: UserFilters) => {
      setIsLoading(true);
      try {
        const newUsersList = await getUsersList(queryParams);
        setUsersList(newUsersList);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          showError(error);
          setIsLoading(false);
        }
      }
    }, 200),
    []
  );

  useEffect(() => {
    fetchUsers(userFilters);
  }, [userFilters, fetchUsers]);

  return (
    <Flex
      vertical
      style={{ width: "100%" }}
    >
      <Title>Users</Title>
      <Flex
        vertical
        style={{
          border: "1px solid #E4E4E4",
          borderRadius: 10,
          padding: "1.5rem 1.5rem 1.5rem 1.5rem",
        }}
      >
        <Row style={{ paddingBottom: "1rem" }}>
          <Col span={14}>
            <Title level={3}>Users</Title>
          </Col>
          <Col span={10}>
            <Flex gap="1rem">
              <Input
                prefix={isLoading ? <LoadingOutlined /> : <SearchOutlined />}
                size="large"
                placeholder="Search by name or email"
                onChange={(e) =>
                  setUserFilters({ search: e.currentTarget.value })
                }
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
        {usersList ? (
          <Table
            pagination={{
              hideOnSinglePage: true,
              defaultPageSize: 20,
              total: usersList.meta.totalAmount,
              onChange(page, pageSize) {
                fetchUsers({ offset: page });
              },
            }}
            style={{ maxHeight: "100%" }}
            dataSource={usersList.data}
            columns={columns}
            size="middle"
            scroll={{ x: "max-content", y: "60vh" }}
          />
        ) : (
          <Skeleton active />
        )}
      </Flex>
    </Flex>
  );
};

export default UsersPage;
