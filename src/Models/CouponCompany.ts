import { CompanyModel } from './Admin';
import { Coupon } from './Customers';
export interface CouponCompany {
  coupon: Coupon,
  company: CompanyModel
}