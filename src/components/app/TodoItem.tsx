import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, List, Row, Space, Typography } from "antd";
import { AxiosError } from "axios";
import { memo, useState, type CSSProperties } from "react";
import { deleteTodoItem, editTodo } from "../../api/todo";
import useErrorMessage from "../../hooks/useErrorMessage";
import type { Todo, TodoFormData } from "../../types/types";
import { titleValidationInfo } from "../../utility/validation";

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

const formItemStyle: CSSProperties = {
  height: 0,
};

const TodoItem = memo(({ todo, updateTasks }: TodoItemProps) => {
  const { Text } = Typography;
  const { title, isDone, id } = todo;
  const showError = useErrorMessage();
  const [taskForm] = Form.useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDisabledDeleteButton, setIsDisabledDeleteButton] =
    useState<boolean>(false);

  const handleDeleteButton = async () => {
    try {
      setIsDisabledDeleteButton(true);
      await deleteTodoItem(id);
      updateTasks();
    } catch (error) {
      if (error instanceof AxiosError) {
        showError(error);
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
      if (error instanceof AxiosError) {
        showError(error);
      }
    }
  };

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleSave = async (formData: TodoFormData) => {
    try {
      await editTodo(id, { title: formData.title });
      updateTasks();
      setIsEditing(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        showError(error);
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
                    disabled={isDisabledDeleteButton}
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
              initialValues={{ title: title }}
              onFinish={(values: TodoFormData) => handleSave(values)}
            >
              <Row gutter={16}>
                <Col span={20}>
                  <Form.Item
                    style={formItemStyle}
                    name="title"
                    rules={[
                      {
                        required: true,
                        min: titleValidationInfo.minLength,
                        max: titleValidationInfo.maxLength,
                        message: titleValidationInfo.message,
                      },
                    ]}
                  >
                    <Input
                      autoFocus
                      variant="filled"
                      count={{ show: true, max: titleValidationInfo.maxLength }}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Space
                    direction="horizontal"
                    size="small"
                  >
                    <Form.Item
                      style={formItemStyle}
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
                      style={formItemStyle}
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
});

export default TodoItem;
