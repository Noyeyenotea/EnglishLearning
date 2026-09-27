import type { ErrorDto, TrackerConfig } from "@en/common/tracker";
import { report } from "@/report";
export const reportError = (visitorId: string, config: TrackerConfig) => {
  const url = config.baseUrl + config.error.api;
  //监听全局js错误
  window.addEventListener("error", (event: ErrorEvent) => {
    const body: ErrorDto = {
      visitorId, //访客ID
      error: event.error.name, //错误类型
      message: event.error.message, //错误信息
      stack: event.error.stack || "", //错误堆栈
      url: window.location.href, //当前页面URL
    };
    report(url, body);
  });

  // 监听未捕获的Promise错误
  window.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) => {
    const isError = e.reason instanceof Error;
    const body: ErrorDto = {
      visitorId,
      error: "promise", //promise错误
      message: isError ? e.reason.message : JSON.stringify(e.reason),
      stack: isError && e.reason.stack ? e.reason.stack : "Promise Rejection",
      url: window.location.href,
    };
    report(url, body);
  });
};
