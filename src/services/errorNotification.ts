import { notification } from "antd";

export function mutationErrorNotification(error: any) {
  if (!error) {
    return;
  }
  const description =
    error.status +
    (Array.isArray(error.data) ? String(error.data[0]) : String(error.data));
  if (error.status && error.data) {
    notification.error({
      message: "에러 발생",
      description,
    });
    console.error(error);
  } else {
    notification.error({
      message: "에러 발생",
      description: "알 수 없는 에러",
    });
    console.error(error);
  }
}

export function queryErrorNotification(error: any, text: string) {
  if (!error) {
    return;
  }
  const description =
    error.status +
    (Array.isArray(error.data) ? String(error.data[0]) : String(error.data));
  if (error && error.status && error.data) {
    notification.error({
      message: text + "을(를) 불러오는 도중에 에러가 발생했습니다.",
      description,
    });
    console.error(error);
  } else {
    notification.error({
      message: text + "을(를) 불러오는 도중에 에러가 발생했습니다.",
      description: "알 수 없는 에러",
    });
    console.error(error);
  }
}
