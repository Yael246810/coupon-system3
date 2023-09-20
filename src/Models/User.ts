export interface User {
  email: string;
  password: string;
  type: ClientType;
}

export enum ClientType {
  ADMIN,
  COMPANY,
  CUSTOMER,
}
