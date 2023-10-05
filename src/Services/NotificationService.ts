import { AxiosError } from "axios";
import { toast } from "react-toastify";

class NotificationService {
  public success(msg: string) {
    toast.success(msg);
  }

  public error(msg: any) {
    toast.error(this.msgFormatter(msg));
  }

  public msgFormatter(msg: any): string {
    if (typeof msg === "string") {
      return msg;
    }

    const axiosError = msg as AxiosError;

    if (axiosError && axiosError.response && axiosError.response.data) {
      if (typeof axiosError.response.data === "string") {
        return axiosError.response.data;
      } else if (axiosError.response.data.description) {
        return axiosError.response.data.description;
      }
    }
    return "Something went wrong";
  }
}

const notifyService = new NotificationService();
export default notifyService;
