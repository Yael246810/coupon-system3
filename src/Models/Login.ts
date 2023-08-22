export interface LoginReqModel{
  email:string;
  password:string;
}

export interface LoginResModel{
  token:string;
  email:string;
}