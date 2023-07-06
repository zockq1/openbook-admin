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

export function queryErrorNotification(error: any, text: string) {
  if (error && error.status && error.data.errorMessage) {
    console.error(error);
    notification.error({
      message: text + "을(를) 불러오는 도중에 에러가 발생했습니다.",
      description: error.status + " : " + error.data.errorMessage,
    });
  } else if (error) {
    notification.error({
      message: text + "을(를) 불러오는 도중에 에러가 발생했습니다.",
      description: "알 수 없는 에러",
    });
    console.error(error);
  }
}
