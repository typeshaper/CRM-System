import { Button, Col, Form, Input, Row } from "antd";
import { AxiosError } from "axios";
import { type CSSProperties, memo } from "react";
import { createTodoItem } from "../../api/todo";
import useErrorMessage from "../../hooks/useErrorMessage";
import type { TodoFormData } from "../../types/types";
import { titleValidationInfo } from "../../utility/validation";

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

const AddTodo = memo(({ updateTasks }: AddTodoProps) => {
  const [taskForm] = Form.useForm();
  const showError = useErrorMessage();

  const handleSubmit = async (formData: TodoFormData) => {
    try {
      await createTodoItem(formData.title);
      taskForm.resetFields();
      updateTasks();
    } catch (error) {
      if (error instanceof AxiosError) {
        showError(error);
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
                min: titleValidationInfo.minLength,
                max: titleValidationInfo.maxLength,
                message: titleValidationInfo.message,
              },
            ]}
          >
            <Input
              count={{ show: true, max: titleValidationInfo.maxLength }}
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
});

export default AddTodo;
