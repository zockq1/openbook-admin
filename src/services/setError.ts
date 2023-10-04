import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ErrorModel } from "../hooks/useNotificationErrorList";

function setError(
  error: FetchBaseQueryError | SerializedError | undefined,
  message: string
): ErrorModel {
  return { error, message };
}

export default setError;
