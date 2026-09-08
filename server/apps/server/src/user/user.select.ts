export const userSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  address: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
  lastLoginAt: true,
  wordNumber: true,
  dayNumber: true,
  bio: true, // 签名  第七集新增字段
  isTimingTask: true, // 是否开启定时任务 第七集新增字段
  timingTaskTime: true, //定时任务时间默认晚上0点开始，每隔24小时执行一
};
export const updateUserSelect = {
  name: true,
  email: true,
  address: true,
  avatar: true,
  bio: true,
  isTimingTask: true,
  timingTaskTime: true,
};
