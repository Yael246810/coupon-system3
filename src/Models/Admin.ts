export interface CompanyModel {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface CouponModel {
  id?: number;
  category: Category;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  price: number;
  image: string;
  company?: CompanyModel;
  customers?: CustomerModel[];
}

export interface CustomerModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export enum Category {
  FOOD,
  HEALTH,
  SPORT,
  ELECTRONICS,
  CLOTHING,
  HOME,
  MOVIES,
  TRAVEL,
  GAMES,
  VACATION,
}

export interface CouponNoCompanyOrCustomerModel {
  id?: number;
  category: Category;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  price: number;
  image: string;
}
