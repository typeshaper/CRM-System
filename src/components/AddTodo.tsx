import { createTodoItem } from "../api/todo";
import { hasValidTodoTitle } from "../utility/validation";
import { Form, Input, Button, Row, Col } from "antd";
import { type CSSProperties } from "react";

interface AddTodoProps {
  updateTasks: () => void;
}

interface FormData {
  taskTitle: string;
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

  const handleSubmit = async (formData: FormData) => {
    try {
      await createTodoItem(formData.taskTitle);
      taskForm.resetFields();
      updateTasks();
    } catch (error) {
      if (error instanceof Error) {
        //
      }
    }
  };

  return (
    <Form
      style={formStyle}
      onFinish={(values: FormData) => handleSubmit(values)}
      form={taskForm}
      autoComplete="off"
      size="large"
    >
      <Row gutter={16}>
        <Col span={20}>
          <Form.Item
            name="taskTitle"
            rules={[
              {
                message: "Title must be between 2 and 64 characters long!",
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
