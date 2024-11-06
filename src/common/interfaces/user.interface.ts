import { Cart } from "../../cart/entities/cart.entity";
import { Role } from "../enums/rol.enum";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  cart: Cart;
  roles: Role[];
}

export interface UserActiveInterface {
  email: string;
  roles: string[];
}

export interface LoginResponse {
  accesToken: string;
  refreshToken: string;
  data: UserResponse;
}
