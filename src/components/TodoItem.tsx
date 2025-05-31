import type { Todo } from "../types/types";
import { hasValidTodoTitle } from "../utility/validation";
import { deleteTodoItem, editTodo } from "../api/todo";
import { useState, type CSSProperties } from "react";
import { Row, Col, List, Space, Input, Button, Typography, Form } from "antd";
import {
  SaveOutlined,
  UndoOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
} from "@ant-design/icons";

interface TodoItemProps {
  todo: Todo;
  updateTasks: () => void;
}

const listStyle: CSSProperties = {
  width: "100%",
  height: "5rem",
};

const rowStyle: CSSProperties = {
  width: "100%",
};

const TodoItem = ({ todo, updateTasks }: TodoItemProps) => {
  const { Text } = Typography;
  const { title, isDone, id } = todo;
  const [taskForm] = Form.useForm();
  const titleName = Form.useWatch("taskTitle", taskForm);

  const [editingError, setEditingError] = useState<Error>();
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteButton = async () => {
    try {
      await deleteTodoItem(id);
      updateTasks();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      updateTasks();
    }
  };

  const handleStatusButton = async () => {
    try {
      await editTodo(id, { isDone: !isDone });
      setIsEditing(false);
      updateTasks();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await editTodo(id, { title: titleName });
      updateTasks();
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        setEditingError(error);
      }
    }
  };

  const handleUndoButton = () => {
    taskForm.resetFields();
    setIsEditing(false);
  };

  return (
    <List.Item style={listStyle}>
      <Row
        style={rowStyle}
        gutter={16}
      >
        <Col span={2}>
          <Button
            shape="default"
            onClick={handleStatusButton}
            icon={isDone ? <CheckOutlined /> : <></>}
          />
        </Col>

        <Col span={22}>
          {!isEditing && (
            <Row gutter={16}>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                span={20}
              >
                <Text ellipsis>{title}</Text>
              </Col>
              <Col span={4}>
                <Space
                  direction="horizontal"
                  size="small"
                >
                  <Button
                    icon={<EditOutlined />}
                    name="edit"
                    onClick={handleEditButton}
                    variant="solid"
                    color="blue"
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    name="delete"
                    onClick={handleDeleteButton}
                    variant="solid"
                    color="red"
                  />
                </Space>
              </Col>
            </Row>
          )}
          {isEditing && (
            <Form
              form={taskForm}
              initialValues={{ taskTitle: title }}
              onFinish={handleSave}
            >
              <Row gutter={16}>
                <Col span={20}>
                  <Form.Item
                    style={{ height: "0" }}
                    name="taskTitle"
                    rules={[
                      {
                        message:
                          "Title must be between 2 and 64 characters long!",
                        validator: (_, value) => {
                          if (hasValidTodoTitle(value)) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject();
                          }
                        },
                      },
                    ]}
                  >
                    <Input
                      autoFocus
                      variant="filled"
                      count={{ show: true, max: 64 }}
                      autoComplete=""
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Space
                    direction="horizontal"
                    size="small"
                  >
                    <Form.Item
                      style={{ height: "0" }}
                      name="saveButton"
                    >
                      <Button
                        icon={<SaveOutlined />}
                        name="save"
                        htmlType="submit"
                        variant="solid"
                        color="green"
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ height: "0" }}
                      name="undoButton"
                    >
                      <Button
                        icon={<UndoOutlined />}
                        name="undo"
                        onClick={handleUndoButton}
                        variant="solid"
                        color="geekblue"
                      />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Row>
    </List.Item>
  );
};

export default TodoItem;
