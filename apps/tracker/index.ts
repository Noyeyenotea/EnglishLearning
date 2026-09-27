import type { TrackerConfig } from "@en/common/tracker";
import { getFingerprint } from "@/uv";
import { reportEvent } from "@/event";
import { reportError } from "@/error";
import { reportPv } from "@/pv";
import { reportPerformance } from "@/performance";
import { reportFetch } from "@/report";
export class Tracker {
  private config: TrackerConfig;
  private visitorId: string | null = null;
  private initPromise: Promise<void> | null = null;
  constructor(config: TrackerConfig) {
    this.config = config;
    this.init(); //初始化方法
  }
  //protected 允许子类和内部使用
  protected async init() {
    if (this.initPromise) {
      return this.initPromise;
    }
    this.initPromise = (async () => {
      this.visitorId = await getFingerprint(this.config);
      reportEvent(this.visitorId!, this.config);
      reportError(this.visitorId!, this.config);
      reportPerformance(this.visitorId!, this.config);
      reportPv(this.visitorId!, this.config);
    })();

    return this.initPromise;
  }
  public async setUserId(userId: string) {
    await this.init();
    let url = this.config.baseUrl + this.config.uv.updateApi;
    await reportFetch(url, {
      visitorId: this.visitorId,
      userId: userId,
    });
  }
}
