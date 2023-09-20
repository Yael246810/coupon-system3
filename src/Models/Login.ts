import { ClientType } from "./User";

export interface LoginReqModel {
  email: string;
  password: string;
  type: ClientType;
}

export interface LoginResModel {
  token?: string;
  title?: string;
  description?: string;
  id: number;
}
