import { createTodoItem } from "../api/todo";
import { Form, Input, Button, Row, Col } from "antd";
import { type CSSProperties } from "react";
import type { TodoFormData } from "../types/types";
import useErrorMessage from "../hooks/useErrorMessage";
import { AxiosError } from "axios";

interface AddTodoProps {
  updateTasks: () => void;
}

const formStyle: CSSProperties = {
  width: "75ch",
  height: "48px",
};

const buttonStyle: CSSProperties = {
  padding: "1rem 2rem",
};

const AddTodo = ({ updateTasks }: AddTodoProps) => {
  const [taskForm] = Form.useForm();
  const { showError } = useErrorMessage();

  const handleSubmit = async (formData: TodoFormData) => {
    try {
      await createTodoItem(formData.title);
      taskForm.resetFields();
      updateTasks();
    } catch (error) {
      if (error instanceof AxiosError) {
        showError(error.response?.data);
      }
    }
  };

  return (
    <Form
      style={formStyle}
      onFinish={(values: TodoFormData) => handleSubmit(values)}
      form={taskForm}
      autoComplete="off"
      size="large"
    >
      <Row gutter={16}>
        <Col span={20}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                min: 2,
                max: 64,
                message: "Title must be between 2 and 64 characters long!",
              },
            ]}
          >
            <Input
              count={{ show: true, max: 64 }}
              placeholder="Enter your task name..."
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="button">
            <Button
              style={buttonStyle}
              htmlType="submit"
              type="primary"
              iconPosition="end"
            >
              Add
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddTodo;
