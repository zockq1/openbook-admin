import { notification } from "antd";

export default function errorMessage(error: any) {
  if (error.status && error.data.errorMessage) {
    notification.error({
      message: "에러 발생",
      description: error.status + " : " + error.data.errorMessage,
    });
  } else {
    notification.error({
      message: "에러 발생",
      description: "알 수 없는 에러",
    });
    console.error(error);
  }
}
