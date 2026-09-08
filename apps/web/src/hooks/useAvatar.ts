import { computed } from "vue";
import { uploadUrl } from "@/apis";

import defaultAvatar from "@/assets/images/avatar/default-avatar.png";
import { useUserStore } from "@/stores/user";
export const useAvatar = () => {
  const userStore = useUserStore();
  //用户头像
  const avatar = computed(() => {
    if (userStore.getUser?.avatar) {
      return uploadUrl + userStore.getUser.avatar;
    } else {
      return defaultAvatar;
    }
  });
  //自定义头像路径
  const customAvatar = (avatar?: string | null) => {
    if (avatar) {
      return uploadUrl + avatar;
    } else {
      return defaultAvatar;
    }
  };
  return {
    avatar,
    customAvatar,
  };
};
