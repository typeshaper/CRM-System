import { App } from "antd";

const useErrorMessage = () => {
  const { notification } = App.useApp();
  const showError = (message: string) => {
    notification.error({ message });
  };

  return { showError };
};

export default useErrorMessage;
