import { watch } from "vue";
import { UseApiReturnProps } from "./useApi";

type FetchEffectProps<Data> = {
  onSuccess?: (data?: Data) => void;
  onData?: (data: Data) => void;
  onError?: ((error: Error) => void) | null;
  dependencies?: any[];
};

export const debounce = (func: () => void, timeout = 300) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const useFetchEffect = <Data>(
  propsToWatch: Partial<UseApiReturnProps>,
  props: FetchEffectProps<Data>
) => {
  const { isLoading, error, data, success } = propsToWatch;
  const { onSuccess, onData, onError, dependencies } = props;

  watch(
    [isLoading, error, data, success, ...(dependencies || [])],
    debounce(() => {
      if (data?.value !== null && !error?.value && !isLoading?.value) {
        onSuccess?.(data?.value);
        data && onData?.(data.value);
      }
      if (error?.value && !isLoading?.value) {
        if (onError === null) return;
        onError && onError(error.value as Error);
      }
    }, 250)
  );
};
