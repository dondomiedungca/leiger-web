import { storeToRefs } from "pinia";
import { HTTPMethod, useApi } from "./useApi";
import { useCookies } from "./useCookies";
import { useAuthStore } from "../stores/useAuth.store";
import jwt_decode from "jwt-decode";

export const useSigninWithGoogle = () => {
  const { isLoading, data, success, error, fetch } = useApi(
    HTTPMethod.POST,
    "/users/signin-with-google",
    false
  );

  const makeRequest = (token: string) => {
    fetch?.({ token });
  };

  return {
    isLoading,
    data,
    success,
    error,
    fetch: makeRequest,
  };
};

export const setUserTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const { setCookie } = useCookies();

  const authStore = useAuthStore();
  const { auth } = storeToRefs(authStore);

  setCookie("ACCESS_TOKEN", accessToken);
  setCookie("REFRESH_TOKEN", refreshToken);

  const decoded: Record<string, any> = jwt_decode(accessToken);

  if (!!decoded.sub) {
    auth.value.user = {
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      id: decoded.sub,
      user_meta: decoded.user_meta,
      created_at: decoded.created_at,
    };
    auth.value.is_authenticated = true;
  }
};

export const useValidateAccessToken = () => {
  const { isLoading, data, success, error, fetch } = useApi(
    HTTPMethod.POST,
    "/token/validate-access-token",
    false
  );

  return {
    isLoading,
    data,
    success,
    error,
    fetch,
  };
};
