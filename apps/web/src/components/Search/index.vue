<template>
  <div v-if="isShow" class="fixed top-0 left-0  w-full h-full z-40 bg-black opacity-30  blur-sm"></div>
  <Transition name="fade">
    <div v-if="isShow" class="fixed inset-0  shadow-lg z-50 p-30 pt-20">
      <div :class="wordList.length > 0 ? 'rounded-tr-[10px] rounded-tl-[10px]' : 'rounded-[10px]'"
        class="flex items-center gap-2 shadow-lg w-1/2 mx-auto p-3  bg-white ">
        <el-icon size="20">
          <Search />
        </el-icon>
        <input v-focus class="w-full h-full text-sm border-none  rounded-lg p-2 focus:outline-none" type="text"
          v-model="search" placeholder="搜索">
      </div>
      <div class="w-1/2 mx-auto max-h-[500px] border-t border-gray-200 overflow-y-auto" v-if="wordList.length > 0">
        <div class="bg-white hover:bg-blue-50   text-gray-800 p-4 cursor-pointer shadow-sm hover:shadow-md "
          v-for="item in wordList" :key="item.id" @click="copyWord(item.word)">
          <div class="text-sm font-semibold text-blue-600 mb-1">{{ item.word }}</div>
          <div v-html="item.translation" class="text-sm text-gray-700 mb-1 overflow-hidden line-clamp-2" />
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, customRef } from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { Word } from '@en/common/word'
import { getWordBookList } from '@/apis/word-book'
import { ElMessage } from 'element-plus'
let timer: ReturnType<typeof setTimeout> | null = null
let isShow = ref(false)
const getList = async () => {
  const res = await getWordBookList({ word: search.value, page: 1, pageSize: 20 })
  if (res.success) {
    wordList.value = res.data.list
  }
}
const search = customRef((track, trigger) => {
  let searchValue = ''
  return {
    get() {
      track()
      return searchValue
    },
    set(newValue: string) {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        searchValue = newValue
        getList()
        trigger()
      }, 500)
    },
  }
})
const wordList = ref<Word[]>([])
const searchWord = () => {
  console.log(search.value)
}
//复制单词
const copyWord = async (word: string) => {
  try {

    await navigator.clipboard.writeText(word)//localhost  / https
    ElMessage.success('复制成功')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}
window.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'f') {
    event.preventDefault() //阻止默认事件
    isShow.value = true
  }
  if (event.key === 'Escape') {
    isShow.value = false
    search.value = ''
  }
})
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>