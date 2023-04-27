import { useEffect } from "react";
import { notification } from "antd";
import { UseQueryState } from "@reduxjs/toolkit/dist/query/react/buildHooks";

function useCategoryListErrorNotification(queryStates: UseQueryState<any>[]) {
  useEffect(() => {
    queryStates.forEach((error) => {
      if (error) {
        console.error(error);
        notification.error({
          message: "에러 발생",
          description: "데이터를 불러오는 도중에 에러가 발생했습니다.",
        });
      }
    });
  }, [queryStates]);
}

export default useCategoryListErrorNotification;
