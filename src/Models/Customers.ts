
export type Root = CustomersModel[]

export interface CustomersModel {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  coupons: Coupon[];
}

export interface Coupon {
  customer: CustomersModel[]; //?
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
