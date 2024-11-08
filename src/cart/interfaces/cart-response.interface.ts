import { User } from "src/user/entities/user.entity";
import { CartItem } from "../entities/cart-item.entity";

export interface CartResponse {
  id: number;
  user: User;
  items: CartItem[];
  last_update: Date;
}
