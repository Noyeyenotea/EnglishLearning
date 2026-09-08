// const userId = userStore.getUser!.id;
// fetchEventSource(`/ai/v1/chat/create`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     role: "normal",
//     userId,
//     content: message.value,
//   }),
// });
import { fetchEventSource } from "@microsoft/fetch-event-source";
import type { Method } from "axios";
export const CHAT_URL = "/ai/v1/chat/create";
export const sse = <T, V = any>(
  url: string,
  method: Method = "POST",
  body: V,
  callback?: (data: T) => void,
  errorCallback?: (error: Error) => void,
) => {
  fetchEventSource(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    onmessage: (event) => {
      callback?.(JSON.parse(event.data) as T);
    },
    onerror: (error) => {
      errorCallback?.(error);
    },
  });
};
