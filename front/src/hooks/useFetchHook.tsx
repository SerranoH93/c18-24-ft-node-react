import axios, { AxiosRequestConfig, Method } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthFetchProps {
  endpoint: string;
  redirectRoute?: string;
  formData?: any;
  options?: AxiosRequestConfig<any>;
  method?: Method;
}

export function useFetchHook() {
  const router = useRouter();

  const authRouter = async ({
    endpoint,
    formData,
    redirectRoute,
    options,
    method = "post", // default method is post
  }: AuthFetchProps) => {
    try {
      const { data } = await axios({
        url: `http://localhost:3001/api/${endpoint}`,
        method,
        data: formData,
        ...options,
      });
      toast.success(data.message, {
        richColors: true,
      });
      if (redirectRoute) {
        router.push(redirectRoute);
        router.refresh();
      }
      return data;
    } catch (error: any) {
      toast.error(error.response.data.message, {
        richColors: true,
      });
    }
  };

  return authRouter;
}
