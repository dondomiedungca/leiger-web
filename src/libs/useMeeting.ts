import { HTTPMethod, useApi } from "./useApi";

export const useCreateMeeting = () => {
  const { isLoading, data, success, error, fetch } = useApi(
    HTTPMethod.POST,
    "/meeting/create",
    false
  );

  const makeRequest = (data: {
    meeting_id: string;
    password: string;
    creator_id?: string;
  }) => {
    fetch?.(data);
  };

  return {
    isLoading,
    data,
    success,
    error,
    fetch: makeRequest,
  };
};

export const useJoin = () => {
  const { isLoading, data, success, error, fetch } = useApi(
    HTTPMethod.POST,
    "/meeting/join",
    false
  );

  const makeRequest = (data: {
    meeting_id: string;
    password: string;
    joiner_id?: string;
  }) => {
    fetch?.(data);
  };

  return {
    isLoading,
    data,
    success,
    error,
    fetch: makeRequest,
  };
};

export const useValidateSession = () => {
  const { isLoading, data, success, error, fetch } = useApi(
    HTTPMethod.POST,
    "/meeting/validate-session",
    false
  );

  const makeRequest = (data: {
    session: string;
    meeting_sid: string;
    joiner_id?: string;
  }) => {
    return fetch?.(data);
  };

  return {
    isLoading,
    data,
    success,
    error,
    fetch: makeRequest,
  };
};
