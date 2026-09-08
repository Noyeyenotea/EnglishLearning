<template>
  <div
    class="p-5 rounded-[5px] w-[256px] bg-purple-50 border border-right-1 border-t-0 border-b-0 border-l-0 border-gray-200">
    <div @click="changeActive(value)" :class="{ 'bg-purple-300': active === value.id }"
      class="rounded-[5px] p-2 transition-all duration-300" v-for="value in chatMode" :key="value.id">
      <div class="text-sm  cursor-pointer p-2 px-4 text-gray-700">
        {{ value.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ChatMode } from '@en/common/chat'
import { getChatMode } from '@/apis/chat'
import { useUserStore } from '@/stores/user'
const emit = defineEmits(['changeMode'])
// 左侧对话模式列表
const chatMode = ref<ChatModeList>([])
// 当前激活的模式 id
const active = ref('')
import type {
  ChatModeList,
  ChatRoleType,
  ChatMessageList,
} from "@en/common/chat";
// 切换模式
const changeActive = (mode: ChatMode) => {
  active.value = mode.id
  emit('changeMode', mode.role)
}

onMounted(() => {
  getChatMode().then((res) => {
    chatMode.value = res.data
    if (chatMode.value.length > 0) {
      active.value = chatMode.value[0]!.id
    }
  })
})

</script>