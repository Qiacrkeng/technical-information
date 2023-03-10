import type Api from "@/types/Api";
import type { UserData } from "@/types/Data";
import type HttpReceive from "@/types/HttpReceive";
import http from "@/utils/http";

const getInfoApi = async (): Promise<Api<UserData>> => {
  const response = await http.get<HttpReceive<UserData>>("user/userinfo");

  const { data } = response;

  if (data.status === 1) {
    return {
      message: data.message,
      isOk: false,
    };
  }
  return {
    isOk: true,
    message: data.message,
    data: data.data,
  };
};

export default getInfoApi;
