import { App } from "antd";
import type { AxiosError } from "axios";

const useErrorMessage = () => {
  const { notification } = App.useApp();
  const showError = (error: AxiosError) => {
    let errorMessage;
    if (error.response) {
      errorMessage = error.response.data as string;
    } else {
      errorMessage = error.message;
    }
    notification.error({ message: errorMessage, placement: "bottomRight" });
  };

  return showError;
};

export default useErrorMessage;
