class UrlServiceClass {
  private port = 8080;
  private baseUrl = `http://localhost:${this.port}`;
  public allCompanies: string;
  public allCustomers: string;
  public allCoupons: string;
  public admin: string;
  public customer: string;
  public company: string;
  public auth: string;
  public user: string;

  constructor() {
    this.allCompanies = this.baseUrl + "/api/admin/companies";
    this.allCustomers = this.baseUrl + "/api/admin/customers";
    this.allCoupons = "";
    this.admin = this.baseUrl + "/api/admin";
    this.customer = this.baseUrl + "/api/customers";
    this.company = this.baseUrl + "/api/companies";
    this.auth = this.baseUrl + "/api/auth";
    this.user = this.baseUrl + "/api/user";
  }
}

const UrlService = new UrlServiceClass();
export default UrlService;
