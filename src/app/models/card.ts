import {Address} from "./address";

export interface Card {
  id: number;
  name: string;
  username: string;
  address?: Address;

}
