import { notification } from "antd";

export function mutationErrorNotification(error: any) {
  if (!error || !error.status) {
    return;
  }

  if (Array.isArray(error.data)) {
    error.data.forEach((item: any) => {
      notification.error({
        message: "에러 발생",
        description: `${error.status}: ${item.error}`,
      });
    });
    console.error(error);
    return;
  }

  if (error.data) {
    notification.error({
      message: "에러 발생",
      description: `${error.status}: ${error.data}`,
    });
    console.error(error);
    return;
  }

  notification.error({
    message: "에러 발생",
    description: "알 수 없는 에러",
  });
  console.error(error);
}

export function queryErrorNotification(error: any, text: string) {
  if (!error || !error.status) {
    return;
  }

  if (Array.isArray(error.data)) {
    error.data.forEach((item: any) => {
      notification.error({
        message: text + "을(를) 불러오는 도중에 에러가 발생했습니다.",
        description: `${error.status}: ${item.error}`,
      });
    });
    console.error(error);
    return;
  }

  if (error.data) {
    notification.error({
      message: text + "을(를) 불러오는 도중에 에러가 발생했습니다.",
      description: `${error.status}: ${error.data}`,
    });
    console.error(error);
    return;
  }

  notification.error({
    message: text + "을(를) 불러오는 도중에 에러가 발생했습니다.",
    description: "알 수 없는 에러",
  });
  console.error(error);
}
