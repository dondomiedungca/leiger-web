import axios, { AxiosResponse } from "axios";
import { ref, onUnmounted, Ref } from "vue";
import { useCookies } from "./useCookies";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.VITE_BACKEND_API
    : import.meta.env.VITE_BACKEND_API;

export enum HTTPMethod {
  POST = "post",
  GET = "get",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

export type UseApiReturnProps = {
  isLoading: Ref<boolean>;
  data: Ref<any>;
  success: Ref<boolean>;
  error: Ref<Error | undefined>;
  fetch: (payload?: any) => any;
};

export type HttpError = {
  error: string;
  message: string;
  statusCode: number;
};

const createHttp = ({
  method,
  url,
  config,
  cancelator,
  payloads,
}: {
  method: HTTPMethod;
  url: string;
  config: any;
  cancelator: any;
  payloads?: any;
}) => {
  switch (method) {
    case HTTPMethod.POST:
      return axios.post(url, payloads, config);
    case HTTPMethod.GET:
      return axios.get(url, {
        ...config,
        cancelToken: cancelator.source.token,
        params: payloads,
      });
    default:
      return axios[method](url, payloads, config);
  }
};

export const useApi = (
  method: HTTPMethod,
  path: string,
  overrideURL?: boolean
): UseApiReturnProps => {
  const isLoading = ref<boolean>(false);
  const data = ref<any>(undefined);
  const success = ref<boolean>(false);
  const error = ref<any>(false);
  const { getCookie, setCookie } = useCookies();

  const url = overrideURL ? path : `${BASE_URL}${path}`;

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetch = async (payload?: any): Promise<AxiosResponse | HttpError> => {
    let response;
    const ACCESS_TOKEN = getCookie("ACCESS_TOKEN");
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };
    try {
      isLoading.value = true;
      error.value = false;
      success.value = false;
      let localResponse = await createHttp({
        method,
        url,
        config: { headers },
        cancelator: {
          source,
        },
        payloads: {
          ...payload,
        },
      });
      response = localResponse.data;
      data.value = localResponse.data;
      success.value = true;
    } catch (e: any) {
      error.value = e;
      if ((e as any)?.response?.data?.statusCode == 403) {
        const REFRESH_TOKEN = getCookie("REFRESH_TOKEN");
        const refetch = await axios.post(
          `${BASE_URL}/token/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${REFRESH_TOKEN}`,
            },
            cancelToken: source.token,
          }
        );
        const recreatedAccessToken = refetch.data;
        if (recreatedAccessToken) {
          setCookie("ACCESS_TOKEN", recreatedAccessToken.accessToken);
          let localResponse = await createHttp({
            method,
            url,
            config: {
              headers: {
                Authorization: `Bearer ${recreatedAccessToken.accessToken}`,
              },
            },
            cancelator: {
              source,
            },
            payloads: { ...payload },
          });
          response = localResponse.data;
        } else {
          response = {
            ...(e as any)?.response?.data,
            e: new Error("Forbidden error"),
          };
        }
      }
    } finally {
      isLoading.value = false;
    }
    return response;
  };

  onUnmounted(() => source.cancel());

  return {
    isLoading,
    data,
    success,
    error,
    fetch,
  };
};
