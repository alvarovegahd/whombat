import { AxiosError } from "axios";

export function copyErrorToClipboard(error: AxiosError) {
  const errorData = error.response?.data || error.message;
  const text =
    typeof errorData === "string"
      ? errorData
      : JSON.stringify(errorData, null, 2);

  navigator.clipboard.writeText(text);
}
