import { router } from "../router";
import { useAuthStore } from "../stores/useAuth.store";
import { useCookies } from "./useCookies";
import { useValidateAccessToken } from "./useUser";
import { storeToRefs } from "pinia";

export const useCache = async () => {
  const { getCookie } = useCookies();
  const { fetch } = useValidateAccessToken();

  const accessToken = getCookie("ACCESS_TOKEN");
  const authStore = useAuthStore();
  const { auth } = storeToRefs(authStore);

  let isAuth: boolean = false;

  if (accessToken) {
    const response = await fetch();
    if (
      !response?.hasOwnProperty("error") &&
      !response?.hasOwnProperty("statusCode")
    ) {
      auth.value.user = {
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        id: response.sub,
        user_meta: response.user_meta,
        created_at: response.created_at,
      };
      auth.value.is_authenticated = true;
      isAuth = true;
    }
  }

  router.beforeEach((to, _from, next) => {
    if (to.name === "login" && auth.value.is_authenticated)
      next({ name: "home" });
    else next();
  });

  return isAuth;
};
