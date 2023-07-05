import { notification } from "antd";

export function mutationErrorNotification(error: any) {
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
