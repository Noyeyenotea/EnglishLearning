import { serverApi, type Response, refreshApi } from "..";
import type {
  UserLogin,
  UserRegister,
  WebResultUser,
  AvatarResult,
  UserUpdate,
} from "@en/common/user";
export const login = (data: UserLogin) =>
  serverApi.post("/user/login", data) as Promise<Response<WebResultUser>>;
export const register = (data: UserRegister) =>
  serverApi.post("/user/register", data) as Promise<Response<WebResultUser>>;
export const refreshTokenApi = (data: { refreshToken: string }) =>
  refreshApi.post("/user/refresh-token", data) as Promise<
    Response<WebResultUser>
  >;
export const uploadAvatar = (data: FormData) =>
  serverApi.post("/user/upload-avatar", data) as Promise<
    Response<AvatarResult>
  >;
export const updateUser = (data: UserUpdate) =>
  serverApi.post("/user/update-user", data) as Promise<Response<UserUpdate>>;
