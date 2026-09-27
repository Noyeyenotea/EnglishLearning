export const digestQueueName = {
  name: 'DIGEST_QUEUE', //消息队列的名称
  task: {
    emailDigest: 'EMAIL_DIGEST_TASK', //邮件任务
    everyDayDigest: 'EVERY_DAY_DIGEST_TASK', //每天任务
  },
} as const;

/** 每个任务名 -> 对应的 job.data 结构 */
export interface DigestJobPayload {
  [digestQueueName.task.emailDigest]: {
    userId: string;
    text: string;
    email: string;
  };
  [digestQueueName.task.everyDayDigest]: Record<string, never>; //无参数
}

export type DigestJobName = keyof DigestJobPayload;

/** 所有任务数据的联合，给 Queue<> 用 */
export type DigestJobData = DigestJobPayload[DigestJobName];
