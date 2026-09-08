<template>
  <div class="w-[1200px] mx-auto flex mt-10">
    <Conversations @changeMode="handleChangeMode" />
    <Bubble :list="list" @sendMessage="handleSendMessage" />
  </div>
</template>
<script setup lang="ts">
import Conversations from './components/Conversations.vue'
import Bubble from './components/Bubble.vue'
import { getChatHistory } from '@/apis/chat'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import type { ChatRoleType, ChatMessageList, ChatDto, ChatMessage } from '@en/common/chat';
import { sse, CHAT_URL } from '@/apis/sse';
const userStore = useUserStore()
const list = ref<ChatMessageList>([]) //存储历史记录的数组
const currentMode = ref<ChatRoleType>('normal') //当前模式
const handleChangeMode = (mode: ChatRoleType) => {
  currentMode.value = mode
  getList()
}
const getList = async () => {
  const userId = userStore.getUser?.id ?? ''
  const res = await getChatHistory(userId, currentMode.value)
  console.log(res);

  list.value = res.data
}
const handleSendMessage = (message: string, deepThink: boolean, webSearch: boolean) => {
  console.log(deepThink, webSearch);

  list.value.push({ role: 'human', content: message, type: 'chat' }) //添加用户的消息
  list.value.push({ role: 'ai', content: '', type: 'chat', reasoning: '' }) //添加AI的消息
  const userId = userStore.getUser?.id ?? ''
  sse<ChatMessage, ChatDto>(CHAT_URL, 'POST', {
    role: currentMode.value, content: message, userId: userId!, deepThink, webSearch
  }, (data) => {
    if (data.type === 'reasoning') {
      list.value[list.value.length - 1]!.reasoning += data.content //将AI的推理结果追加到最后一条
    }
    else {
      list.value[list.value.length - 1]!.content += data.content //将AI的消息追加到最后一条
    }
  })

}

getList()

</script>