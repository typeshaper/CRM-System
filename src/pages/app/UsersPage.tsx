import { useCallback, useEffect, useState, type CSSProperties } from "react";
import {
  Roles,
  type User,
  type UserFilters,
  type UsersMetaResponse,
} from "../../types/admin.ts";
import {
  blockUser,
  deleteUser,
  editRoles,
  getUsersList,
  unblockUser,
} from "../../api/admin.ts";
import { AxiosError } from "axios";
import useErrorMessage from "../../hooks/useErrorMessage";
import {
  Tag,
  Popconfirm,
  Table,
  Space,
  Skeleton,
  Button,
  Select,
  type MenuProps,
  type SelectProps,
} from "antd";
import type { PresetColorKey } from "antd/es/theme/internal";
import { formatDateFromIsoString } from "../../utility/date";
import {
  PhoneOutlined,
  MailOutlined,
  SearchOutlined,
  FilterOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Dropdown, Typography, Flex, Row, Col, Input } from "antd";
import debounce from "lodash.debounce";
import type { ColumnsType } from "antd/es/table/InternalTable";
import type { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router";
import useApp from "antd/es/app/useApp";
import Modal from "antd/es/modal/Modal";

const UsersPage = () => {
  const [usersList, setUsersList] = useState<UsersMetaResponse<User>>();
  const showError = useErrorMessage();
  const { Title } = Typography;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userFilters, setUserFilters] = useState<UserFilters>({});
  const navigate = useNavigate();
  const app = useApp();
  const notification = app.notification;
  const [isRolesModalOpen, setIsRolesModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentRoles, setCurrentRoles] = useState<Roles[]>([]);

  const showRolesModal = () => {
    setIsRolesModalOpen(true);
  };

  const handleRolesModalOk = async () => {
    try {
      if (selectedUser?.id) {
        editRoles(selectedUser?.id, { roles: currentRoles });
        setIsRolesModalOpen(false);
        setSelectedUser(null);
        fetchUsers(userFilters);
        notification.success({
          message: `You have changed ${selectedUser.username} roles!`,
          placement: "bottomRight",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showError(error);
      }
      setIsRolesModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleRolesModalCancel = () => {
    setIsRolesModalOpen(false);
    setSelectedUser(null);
  };

  const roleSelectOptions: SelectProps["options"] = [];
  Object.values(Roles).forEach((role) => {
    roleSelectOptions.push({
      value: role,
      label: role,
    });
  });

  const columns: ColumnsType<User> = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      fixed: "left",
      sorter: true,
      render: (_, user) => {
        return (
          <div
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              width: "200px",
            }}
          >
            {user.username}
          </div>
        );
      },
      width: "200px",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (_, user) => (
        <Space
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            width: "260px",
          }}
          direction="horizontal"
          size="small"
        >
          <MailOutlined />
          <p>{user.email}</p>
        </Space>
      ),
      width: "260px",
      ellipsis: true,
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
      ellipsis: true,
      width: "18ch",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (_, user) => {
        return (
          <Space
            size={[4, 16]}
            direction="horizontal"
            wrap
            style={{
              width: "170px",
            }}
          >
            {user.roles.map((role) => {
              let color: PresetColorKey = "magenta";
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
      ellipsis: true,
      render: (_, user) => <p>{user.isBlocked ? "+" : "-"}</p>,
      width: "10ch",
    },
    {
      title: "Registration date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
      render: (_, user) => (
        <p style={{ maxWidth: "10ch" }}>{formatDateFromIsoString(user.date)}</p>
      ),
      width: "15ch",
    },
    {
      title: "",
      dataIndex: "userActions",
      key: "userActions",
      render: (_, user) => {
        return (
          <Space>
            <Button
              variant="outlined"
              color="default"
              style={{
                border: "1px solid black",
              }}
              onClick={() => {
                navigate(`${user.id}`);
              }}
            >
              →
            </Button>
            <Popconfirm
              okText="Yes"
              cancelText="No"
              onConfirm={async () => {
                try {
                  await deleteUser(user.id);
                  fetchUsers(userFilters);
                  notification.success({
                    message: `You have deleted user: ${user.username}`,
                    placement: "bottomRight",
                  });
                } catch (error) {
                  if (error instanceof AxiosError) {
                    showError(error);
                  }
                }
              }}
              title="Are you sure to delete this user?"
            >
              <Button
                variant="outlined"
                color="default"
                style={{
                  border: "1px solid black",
                }}
              >
                <DeleteOutlined />
              </Button>
            </Popconfirm>

            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  {
                    label: !user.isBlocked ? (
                      <Popconfirm
                        okText="Yes"
                        cancelText="No"
                        title="Block this user?"
                        onConfirm={async () => {
                          try {
                            await blockUser(user.id);
                            fetchUsers(userFilters);
                            notification.success({
                              message: `You have blocked user: ${user.username}`,
                              placement: "bottomRight",
                            });
                          } catch (error) {
                            if (error instanceof AxiosError) {
                              showError(error);
                            }
                          }
                        }}
                      >
                        Block
                      </Popconfirm>
                    ) : (
                      <Popconfirm
                        okText="Yes"
                        cancelText="No"
                        title="Unblock this user?"
                        onConfirm={async () => {
                          try {
                            await unblockUser(user.id);
                            fetchUsers(userFilters);
                            notification.success({
                              message: `You have unblocked user: ${user.username}`,
                              placement: "bottomRight",
                            });
                          } catch (error) {
                            if (error instanceof AxiosError) {
                              showError(error);
                            }
                          }
                        }}
                      >
                        Unblock
                      </Popconfirm>
                    ),
                    key: "changeBlockStatus",
                  },
                  {
                    label: (
                      <p
                        onClick={() => {
                          showRolesModal();
                          setSelectedUser(user);
                        }}
                      >
                        Roles
                      </p>
                    ),
                    key: "editRoles",
                  },
                ],
              }}
            >
              <MoreOutlined />
            </Dropdown>
          </Space>
        );
      },
      width: "150px",
    },
  ];

  const selectedMenuItemStyle: CSSProperties = {
    color: "#1777FF",
    backgroundColor: "#E6f4FF",
  };

  const filterMenuItems: MenuProps["items"] = [
    {
      label: "All",
      key: "all",
      onClick: () => {
        setUserFilters((prev) => {
          const newFilters = {
            ...prev,
            isBlocked: undefined,
            offset: undefined,
          };
          return newFilters;
        });
      },
      style:
        userFilters.isBlocked === undefined ? selectedMenuItemStyle : undefined,
    },
    {
      label: "Blocked",
      key: "blocked",
      onClick: () => {
        setUserFilters((prev) => {
          const newFilters = {
            ...prev,
            isBlocked: true,
            offset: undefined,
          };
          return newFilters;
        });
      },
      style: userFilters.isBlocked === true ? selectedMenuItemStyle : undefined,
    },
    {
      label: "Unblocked",
      key: "unblocked",
      onClick: () => {
        setUserFilters((prev) => {
          const newFilters = {
            ...prev,
            isBlocked: false,
            offset: undefined,
          };
          return newFilters;
        });
      },
      style:
        userFilters.isBlocked === false ? selectedMenuItemStyle : undefined,
    },
  ];

  const filterMenuProps = {
    items: filterMenuItems,
  };

  let userHeading = "All users";

  if (userFilters.isBlocked) {
    userHeading = "Blocked users";
  }

  if (userFilters.isBlocked === false) {
    userHeading = "Unblocked users";
  }

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
          <Col span={10}>
            <Title level={3}>{userHeading}</Title>
          </Col>
          <Col span={14}>
            <Flex gap="1rem">
              <Input
                prefix={<SearchOutlined />}
                size="large"
                placeholder="Search by name or email"
                onChange={(e) =>
                  setUserFilters((prev) => {
                    const newFilters = {
                      ...prev,
                      search: e.currentTarget.value,
                    };

                    return newFilters;
                  })
                }
              />
              <Dropdown menu={filterMenuProps}>
                <Button
                  style={{
                    minWidth: "12ch",
                    border: "2px solid black",
                    height: "2.5rem",
                  }}
                >
                  <Space>
                    <FilterOutlined />
                    <p>Filter</p>
                  </Space>
                </Button>
              </Dropdown>
            </Flex>
          </Col>
        </Row>
        {usersList ? (
          <Table
            tableLayout="fixed"
            loading={isLoading}
            rowKey="id"
            pagination={{
              current: (userFilters.offset && userFilters.offset + 1) ?? 1,
              defaultPageSize: 20,
              total: usersList.meta.totalAmount,
              onChange(page, pageSize) {
                setUserFilters((prev) => {
                  const newFilters = {
                    ...prev,
                    offset: page - 1,
                    limit: pageSize,
                  };

                  return newFilters;
                });
              },
            }}
            style={{ maxHeight: "100%" }}
            dataSource={usersList.data}
            columns={columns}
            size="middle"
            scroll={{ x: "max-content", y: "60vh" }}
            onChange={(_pagination, _filters, sorter) => {
              setUserFilters((prev) => {
                const hasValidOrder = (str: string | undefined) => {
                  if (str === "asc") return "asc" as const;
                  if (str === "desc") return "desc" as const;
                  if (str === undefined) return undefined;
                };

                const sortOrder = hasValidOrder(
                  (sorter as SorterResult<User>).order?.slice(0, -3)
                );

                const newFilters = {
                  ...prev,
                  sortOrder,
                  sortBy:
                    (sorter as SorterResult<User>).field?.toString() ?? "id",
                };

                return newFilters satisfies UserFilters;
              });
            }}
          />
        ) : (
          <Skeleton active />
        )}
      </Flex>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isRolesModalOpen}
        onCancel={handleRolesModalCancel}
        onOk={handleRolesModalOk}
      >
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Select roles"
          options={roleSelectOptions}
          defaultValue={selectedUser?.roles}
          onChange={(values) => setCurrentRoles(values)}
        />
      </Modal>
    </Flex>
  );
};

export default UsersPage;
