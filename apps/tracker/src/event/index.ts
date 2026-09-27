import type { EventDto, TrackerConfig } from "@en/common/tracker";
import { report } from "@/report";
export const reportEvent = (visitorId: string, config: TrackerConfig) => {
  const ButtonName = "BUTTON";
  const SpanName = "SPAN";
  document.addEventListener("click", (e: MouseEvent) => {
    const url = config.baseUrl + config.event.api;
    const sendEvent = () => {
      const react = target.getBoundingClientRect();
      const body: EventDto = {
        visitorId, //访客ID
        event: e.type, //事件类型
        payload: {
          x: react.left.toFixed(2) || 0, //点击位置X
          y: react.top.toFixed(2) || 0, //点击位置Y
          width: react.width.toFixed(2) || 0, //点击位置宽度
          height: react.height.toFixed(2) || 0, //点击位置高度
          text: target.textContent, //点击元素文本
        },
        url: window.location.href, //当前页面URL
      };
      report(url, body);
    };
    const target = e.target as HTMLElement;
    if (target.nodeName === ButtonName) {
      console.log(target.nodeName);

      sendEvent();
    }
    if (
      target.nodeName === SpanName &&
      target.parentElement?.nodeName === ButtonName
    ) {
      sendEvent();
    }
  });
};
