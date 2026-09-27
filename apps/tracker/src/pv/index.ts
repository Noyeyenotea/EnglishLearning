import type { PvDto, TrackerConfig } from "@en/common/tracker";
import { report } from "@/report";
const reportView = (visitorId: string, config: TrackerConfig) => {
  const isHash = window.location.href.includes("#"); //如果携带了# 说明是hash模式
  const body: PvDto = {
    visitorId,
    url: window.location.protocol + "//" + window.location.host, // 页面URL
    referrer: document.referrer, // 来源URL
    path: isHash ? "/" + window.location.hash : window.location.pathname, // 页面路径
  };
  const url = config.baseUrl + config.pv.api;
  report(url, body);
};

export const reportPv = (visitorId: string, config: TrackerConfig) => {
  const originalPushState = history.pushState;
  window.addEventListener("hashchange", (e) => {
    reportView(visitorId, config);
  });
  //popstate 前进和后退
  //router.push router.replace
  window.addEventListener("popstate", (e) => {
    reportView(visitorId, config);
  });
  history.pushState = function (
    data: any,
    unused: string,
    url?: string | URL | null,
  ) {
    originalPushState.call(this, data, unused, url);
    reportView(visitorId, config);
  };
  history.replaceState = function (
    data: any,
    unused: string,
    url?: string | URL | null,
  ) {
    originalPushState.call(this, data, unused, url);
    reportView(visitorId, config);
  };
};
