import type { UvDto, TrackerConfig } from "@en/common/tracker";
// FingerprintJS 统计的是“设备/浏览器层面的独立访客
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { UAParser } from "ua-parser-js";
import { reportFetch } from "@/report";
//获取浏览器信、操作系统信息、设备类型
export const getBrowserInfo = () => {
  const ua = new UAParser();
  return {
    browser: ua.getBrowser().name,
    os: ua.getOS().name,
    device: ua.getDevice().type || "desktop",
  };
};

export const getFingerprint = async (config: TrackerConfig) => {
  const browserInfo = getBrowserInfo();
  console.log(browserInfo);

  const fp = await FingerprintJS.load();
  const result = await fp.get();
  console.log(result);

  const body: UvDto = {
    anonymousId: result.visitorId,
    browser: browserInfo.browser ?? "unkown",
    os: browserInfo.os ?? "unkown",
    device: browserInfo.device,
  };
  let url = config.baseUrl + config.uv.api;
  //上报给后端
  const res = await reportFetch(url, body);
  return res.data;
};
