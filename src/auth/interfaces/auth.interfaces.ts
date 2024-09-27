import { UserResponse } from "../../common/interfaces/user-response.interface";

export interface UserPayload {
  email: string;
  roles: string[];
}

export interface LoginResponse {
  accesToken: string;
  refreshToken: string;
  data: UserResponse;
}
