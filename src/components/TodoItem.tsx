import type { Todo } from "../types/types";
import { deleteTodoItem, editTodo } from "../api/todo";
import { hasValidTodoTitle } from "../utility/validation";
import { useState, type CSSProperties } from "react";
import { Row, Col, List, Space, Form, Input, Button } from "antd";
import {
  SaveOutlined,
  UndoOutlined,
  DeleteOutlined,
  EditOutlined,
  CloseSquareOutlined,
  CheckOutlined,
} from "@ant-design/icons";

interface TodoItemProps {
  todo: Todo;
  updateTasks: () => void;
}

const listStyle: CSSProperties = {
  width: "100%",
};

const rowStyle: CSSProperties = {
  width: "100%",
};

const TodoItem = ({ todo, updateTasks }: TodoItemProps) => {
  const { title, isDone, id } = todo;
  const [editingError, setEditingError] = useState<Error>();
  const [isEditing, setIsEditing] = useState(false);
  const [didEdit, setDidEdit] = useState<boolean>(false);
  const [newTitleValue, setNewTitleValue] = useState<string>(title);
  const isValidTitle = hasValidTodoTitle(newTitleValue);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitleValue(event.target.value);
    setDidEdit(false);
  };

  const handleBlur = () => {
    setDidEdit(true);
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
    if (!isValidTitle) return;
    try {
      await editTodo(id, { title: newTitleValue });
      updateTasks();
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        setEditingError(error);
      }
    }
  };

  const handleUndoButton = () => {
    setNewTitleValue(title);
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

        <Col span={18}>{!isEditing && <p>{title}</p>}</Col>
        <Col span={4}>
          <Space>
            {isEditing && (
              <Form onFinish={handleSave}>
                <Input
                  type="text"
                  name="title"
                  value={newTitleValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Space
                  direction="horizontal"
                  size="small"
                >
                  <Button
                    icon={<SaveOutlined />}
                    name="save"
                    onClick={handleSave}
                  />
                  <Button
                    icon={<UndoOutlined />}
                    name="undo"
                    onClick={handleUndoButton}
                  />
                </Space>
              </Form>
            )}
            {!isEditing && (
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
            )}
          </Space>
        </Col>
      </Row>
    </List.Item>
  );
};

export default TodoItem;
