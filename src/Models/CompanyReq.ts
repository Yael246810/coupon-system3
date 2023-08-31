export interface CompanyReq{
  id: string | number | readonly string[] | undefined;
  name: string;
  email: string;
  password: string;
}