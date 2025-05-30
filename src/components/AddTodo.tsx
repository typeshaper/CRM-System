import { useState, type CSSProperties } from "react";
import { createTodoItem } from "../api/todo";
import { Form, Input, Button, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface AddTodoProps {
  updateTasks: () => void;
}

const formStyle: CSSProperties = {
  width: "100%",
  height: "48px",
};

const buttonStyle: CSSProperties = {
  padding: "1rem 2rem",
};

const AddTodo = ({ updateTasks }: AddTodoProps) => {
  const [isUploadingTask, setIsUploadingTask] = useState<boolean>(false);
  const [taskForm] = Form.useForm();
  const titleName = Form.useWatch("taskTitle", taskForm);

  const handleSubmit = async () => {
    setIsUploadingTask(true);

    try {
      await createTodoItem(titleName);
      taskForm.resetFields();
      updateTasks();
    } catch (error) {
      if (error instanceof Error) {
        //
      }
    }
    setIsUploadingTask(false);
  };

  return (
    <Form
      style={formStyle}
      onFinish={handleSubmit}
      form={taskForm}
      autoComplete="off"
      size="large"
    >
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item name="taskTitle">
            <Input placeholder="Enter your task name..." />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="button">
            <Button
              style={buttonStyle}
              htmlType="submit"
              type="primary"
              loading={isUploadingTask}
              icon={isUploadingTask && <LoadingOutlined />}
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
