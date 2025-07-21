import {
  DeleteOutlined,
  FilterOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Flex,
  Input,
  Popconfirm,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
  type MenuProps,
  type SelectProps,
} from "antd";
import useApp from "antd/es/app/useApp";
import { hasValidOrder } from "../../utility/validation.ts";
import Modal from "antd/es/modal/Modal";
import type { ColumnsType } from "antd/es/table/InternalTable";
import type { SorterResult } from "antd/es/table/interface";
import type { PresetColorKey } from "antd/es/theme/internal";
import { AxiosError } from "axios";
import parsePhoneNumberFromString from "libphonenumber-js";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import {
  blockUser,
  deleteUser,
  editRoles,
  getUsersList,
  unblockUser,
} from "../../api/admin.ts";
import useErrorMessage from "../../hooks/useErrorMessage";
import type { RootState } from "../../store/index.ts";
import { usersTableActions } from "../../store/usersTable.ts";
import {
  Roles,
  type User,
  type UserFilters,
  type UsersMetaResponse,
} from "../../types/admin.ts";
import type { Role } from "../../types/user.ts";
import { format } from "date-fns";
import { isEmpty } from "lodash";

const UsersPage = () => {
  const [usersList, setUsersList] = useState<UsersMetaResponse<User>>();
  const showError = useErrorMessage();
  const { Title } = Typography;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const app = useApp();
  const notification = app.notification;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentRoles, setCurrentRoles] = useState<Roles[]>([]);
  const userFilters = useSelector(
    (state: RootState) => state.usersTable.userFilters
  );

  const isAdmin = useSelector<RootState, boolean>(
    (state) => state.auth.isAdmin
  );

  const isModerator = useSelector<RootState, boolean>(
    (state) => state.auth.isModerator
  );

  const setUserFilters = (filters: UserFilters) => {
    dispatch(usersTableActions.setUserFilters(filters));
  };

  const dispatch = useDispatch();

  const handleRolesModalOk = async () => {
    try {
      if (selectedUser?.id) {
        if (isEmpty(currentRoles) || currentRoles === selectedUser.roles) {
          notification.info({
            message: `Roles have not changed!`,
            placement: "bottomRight",
          });
          setSelectedUser(null);
          return;
        }
        await editRoles(selectedUser?.id, { roles: currentRoles });
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
      setSelectedUser(null);
    }
    setSelectedUser(null);
  };

  const handleRolesModalCancel = () => {
    setSelectedUser(null);
  };

  const roleSelectOptions: SelectProps["options"] = [];
  Object.values(Roles).forEach((role) => {
    roleSelectOptions.push({
      value: role,
      label: role,
    });
  });

  const getRoleTagColor = (role: Role): PresetColorKey => {
    switch (role) {
      case "ADMIN":
        return "purple";
      case "MODERATOR":
        return "orange";
      case "USER":
        return "blue";
      default:
        return "volcano";
    }
  };

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
              width: "200px",
            }}
          >
            {user.username}
          </div>
        );
      },
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
            size={[4, 16]}
            direction="horizontal"
            wrap
            style={{
              width: "170px",
            }}
          >
            {user.roles.map((role) => {
              const color = getRoleTagColor(role);
              return <Tag color={color}>{role}</Tag>;
            })}
          </Space>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "status",
      ellipsis: true,
      render: (_, user) => {
        const activeUser = <Tag color="green">Active</Tag>;
        const blockedUser = <Tag color="red">Blocked</Tag>;
        return <p>{user.isBlocked ? blockedUser : activeUser}</p>;
      },
      width: "10ch",
    },
    {
      title: "Registration date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
      render: (_, user) => (
        <p style={{ maxWidth: "10ch" }}>{format(user.date, "dd.MM.y")}</p>
      ),
      width: "15ch",
    },
    {
      title: "Actions",
      dataIndex: "userActions",
      key: "userActions",
      render: (_, user) => {
        return (
          <Space>
            <Tooltip title="Go to profile">
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
            </Tooltip>
            <Popconfirm
              okText="Yes"
              cancelText="No"
              disabled={!isAdmin}
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
              <Tooltip title="Delete user">
                <Button
                  variant="outlined"
                  color="default"
                  disabled={!isAdmin}
                  style={{
                    border: "1px solid black",
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
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
                        disabled={!isAdmin}
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
                    disabled: user.isBlocked && !isAdmin,
                  },

                  {
                    label: (
                      <p
                        onClick={() => {
                          if (!isAdmin) {
                            return;
                          }
                          setSelectedUser(user);
                          setCurrentRoles(user.roles);
                        }}
                      >
                        Edit roles
                      </p>
                    ),
                    key: "editRoles",
                    disabled: !isAdmin,
                  },
                ],
              }}
            >
              <MoreOutlined />
            </Dropdown>
            <Modal
              destroyOnHidden
              title="User roles"
              closable={{ "aria-label": "Custom Close Button" }}
              open={selectedUser?.id === user.id}
              onCancel={handleRolesModalCancel}
              onOk={handleRolesModalOk}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Select roles"
                options={roleSelectOptions}
                defaultValue={user.roles}
                onChange={(values) => setCurrentRoles(values)}
              />
            </Modal>
          </Space>
        );
      },
      width: "170px",
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
        setUserFilters({
          isBlocked: undefined,
          offset: undefined,
        });
      },
      style:
        userFilters.isBlocked === undefined ? selectedMenuItemStyle : undefined,
    },
    {
      label: "Active",
      key: "active",
      onClick: () => {
        setUserFilters({
          isBlocked: false,
          offset: undefined,
        });
      },
      style:
        userFilters.isBlocked === false ? selectedMenuItemStyle : undefined,
    },
    {
      label: "Blocked",
      key: "blocked",
      onClick: () => {
        setUserFilters({
          isBlocked: true,
          offset: undefined,
        });
      },
      style: userFilters.isBlocked === true ? selectedMenuItemStyle : undefined,
    },
  ];

  let userHeading = "All users";

  if (userFilters.isBlocked) {
    userHeading = "Blocked users";
  }

  if (userFilters.isBlocked === false) {
    userHeading = "Active users";
  }

  const fetchUsers = useCallback(
    async (queryParams: UserFilters) => {
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
    },
    [showError]
  );
  const handleSearchDebounced = debounce((value: string) => {
    setUserFilters({ search: value });
  }, 500);

  useEffect(() => {
    fetchUsers(userFilters);
  }, [userFilters]);

  if (!isModerator && !isAdmin) {
    return (
      <Navigate
        to="/app"
        replace
      />
    );
  }

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
          padding: "1.5rem",
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
                name="searchUser"
                placeholder="Search by name or email"
                defaultValue={userFilters.search}
                onChange={(e) => handleSearchDebounced(e.currentTarget.value)}
              />
              {isAdmin && (
                <Dropdown menu={{ items: filterMenuItems }}>
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
              )}
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
                setUserFilters({
                  offset: page - 1,
                  limit: pageSize,
                });
              },
            }}
            style={{ maxHeight: "100%" }}
            dataSource={usersList.data}
            columns={columns}
            size="middle"
            scroll={{ x: "max-content", y: "60vh" }}
            onChange={(_pagination, _filters, sorter) => {
              const sortOrder = (sorter as SorterResult<User>).order?.slice(
                0,
                -3
              );
              if (hasValidOrder(sortOrder)) {
                setUserFilters({
                  sortOrder: sortOrder,
                  sortBy:
                    (sorter as SorterResult<User>).field?.toString() ?? "id",
                });
              } else {
                setUserFilters({
                  sortOrder: undefined,
                  sortBy: undefined,
                });
              }
            }}
          />
        ) : (
          <Skeleton active />
        )}
      </Flex>
    </Flex>
  );
};

export default UsersPage;
