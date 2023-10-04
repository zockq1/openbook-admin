import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect } from "react";
import { queryErrorNotification } from "../services/errorNotification";

export interface ErrorModel {
  error: FetchBaseQueryError | SerializedError | undefined;
  message: string;
}

function useNotificationErrorList(errorList: ErrorModel[]) {
  useEffect(() => {
    errorList.forEach(({ error, message }) => {
      if (error) {
        queryErrorNotification(error, message);
      }
    });
  }, [errorList]);
}

export default useNotificationErrorList;
