const authServiceFactory = () => {
  let accessToken: string = "";

  const getAccessToken = () => {
    return accessToken;
  };
  const setAccessToken = (token: string) => {
    accessToken = token;
  };
  const clearAccessToken = () => {
    accessToken = "";
  };

  let isRetry = false;

  const setIsRetry = () => {
    isRetry = true;
  };

  const unsetIsRetry = () => {
    isRetry = false;
  };

  const getIsRetry = () => {
    return isRetry;
  };

  return {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
    setIsRetry,
    unsetIsRetry,
    getIsRetry,
  };
};

const authService = authServiceFactory();

export default authService;
