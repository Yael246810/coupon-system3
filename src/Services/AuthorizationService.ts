import { AxiosRequestConfig } from "axios";
import store from "../Components/Redux/store";

class AuthorizationService {
    getPostHeaders(): AxiosRequestConfig {
        const headers: AxiosRequestConfig = this.getHeaders();
        return headers;
      }

      getHeaders() {
        const headers = {
          headers: {
            'Authorization': store.getState().user.token,
            'Content-Type': 'application/json',
          },
        };
        return headers;
      }
}

export default AuthorizationService;