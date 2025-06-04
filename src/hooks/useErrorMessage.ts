import { App } from "antd";

const useErrorMessage = () => {
  const { notification } = App.useApp();
  const showError = (message: string) => {
    notification.error({ message, placement: "bottomRight" });
  };

  return showError;
};

export default useErrorMessage;
