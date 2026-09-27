<template>
  <Search></Search>
  <RouterView />
  <Login />
</template>
<script setup lang="ts">
import Search from './components/Search/index.vue'
import Login from './components/Login/index.vue'
import { provide, ref, watch } from 'vue'
import { IS_SHOW_LOGIN } from "@/components/Login/type";
import { useSocket } from '@/hooks/useSoket';
provide(IS_SHOW_LOGIN, ref(false)) // 是否显示登录框 并且扩展为全局调用 默认不显示
import { useUserStore } from './stores/user'
import { Tracker } from '@en/tracker'
const userStore = useUserStore()
const { connect, disconnect } = useSocket()
const tracker = new Tracker({
  baseUrl: '/api/v1',
  uv: {
    api: '/tracker/uv',
    updateApi: '/tracker/update-uv',
  },
  pv: {
    api: '/tracker/pv',
  },
  event: {
    api: '/tracker/event',
  },
  error: {
    api: '/tracker/error',
  },
  performance: {
    api: '/tracker/performance',
  }
})
watch(() => userStore.user?.id, (newVal) => {
  console.log('newVal', newVal);

  if (newVal) {
    connect();
    tracker.setUserId(newVal)
  } else {
    disconnect();
  }
}, { immediate: true })
</script>
<style scoped></style>
