// export type Root = CompaniesModel[]


export interface CompaniesModel {
  id: number;
  name: string;
  email: string;
  password: string;
  coupons: Coupon[];
}

export interface Coupon {
  company: CompaniesModel; // is it ok?
  id: number;
  category: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  price: number;
  image: string;
}
