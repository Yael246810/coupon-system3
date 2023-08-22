export interface CompanyModel {
    id:number;
    name:string;
    email:string;
    password:string;
    coupons:CouponModel[];
}

export interface CouponModel {
    id:number;
    category:string;
    title:string;
    description:string;
    startDate:Date;
    endDate:Date;
    amount:number;
    price:number;
    image:string;
    company:CompanyModel;
    customers:CustomerModel[];
}

export interface CustomerModel {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

